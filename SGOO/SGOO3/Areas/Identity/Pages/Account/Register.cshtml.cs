using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using SGOO3.Data;

namespace SGOO3.Areas.Identity.Pages.Account
{

    [Authorize(Roles = "Admin,Gestor")]
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public RegisterModel(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
            _roleManager = roleManager;
            _context = context;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "O {0} deve ter pelo menos {2} e no máximo {1} caracteres.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "Senha")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "Confirme a senha")]
            [Compare("Password", ErrorMessage = "A senha e a senha de confirmação não correspondem.")]
            public string ConfirmPassword { get; set; }

            [Required]
            [Display(Name = "User Role")]
            public string UserRole { get; set; }

            [Required]
            [Display(Name = "Perfil")]
            public string UserRoleProfile { get; set; }
        }


        public void OnGet(string returnUrl = null)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.Role);
            if (userId == "Gestor")
            {
                ViewData["roles"] = new SelectList(_roleManager.Roles.Where(x => x.Name != "Admin").Where(x => !x.Name.Contains("Perfil")), "Id", "Name");
            }
            else
            {
                ViewData["roles"] = new SelectList(_roleManager.Roles.Where(x => !x.Name.Contains("Perfil")), "Name", "Name");
            }

            ViewData["UserRoleProfile"] = new SelectList(_roleManager.Roles.Where(x => x.Name.Contains("Perfil")), "Name", "Name");

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            var role = _roleManager.FindByNameAsync(Input.UserRole).Result;
            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = Input.Email, Email = Input.Email };

                var result = await _userManager.CreateAsync(user, Input.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("O usuário criou uma nova conta com senha.");
                    await _userManager.AddToRoleAsync(user, Input.UserRole);
                    await _userManager.AddToRoleAsync(user, Input.UserRoleProfile);

                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    //var callbackUrl = Url.Page(
                    //    "/Account/ConfirmEmail",
                    //    pageHandler: null,
                    //    values: new { area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl },
                    //    protocol: Request.Scheme);

                    //await _emailSender.SendEmailAsync(Input.Email, "Confirme seu E-mail",
                    //    $"Por favor, confirme sua conta até <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicando aqui</a>.");

                    //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    //{
                    //    return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    //}
                    //else
                    //{
                    //    await _signInManager.SignInAsync(user, isPersistent: false);
                    //    return LocalRedirect(returnUrl);
                    //}

                    //await _signInManager.SignInAsync(user, isPersistent: false);
                    return LocalRedirect(returnUrl + "UsersControllers");

                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            var userId = this.User.FindFirstValue(ClaimTypes.Role);
            if (userId == "Gestor")
            {
                ViewData["roles"] = new SelectList(_roleManager.Roles.Where(x => x.Name != "Admin").Where(x => !x.Name.Contains("Perfil")), "Id", "Name");
            }
            else
            {
                ViewData["roles"] = new SelectList(_roleManager.Roles.Where(x => !x.Name.Contains("Perfil")), "Name", "Name");
            }

            ViewData["UserRoleProfile"] = new SelectList(_roleManager.Roles.Where(x => x.Name.Contains("Perfil")), "Name", "Name");

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
