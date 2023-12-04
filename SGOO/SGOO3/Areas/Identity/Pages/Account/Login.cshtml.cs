using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using SGOO3.Data;
using SGOO3.Models;
using System.DirectoryServices.AccountManagement;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Reflection.PortableExecutable;

namespace SGOO3.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class LoginModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<LoginModel> _logger;

        public LoginModel(SignInManager<IdentityUser> signInManager,
            ILogger<LoginModel> logger,
            UserManager<IdentityUser> userManager,
            IConfiguration config,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _config = config;
            _context = context;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public string ReturnUrl { get; set; }

        [TempData]
        public string ErrorMessage { get; set; }
        public class InputModel
        {
            [Required(ErrorMessage = "Informe o nome do usuário", AllowEmptyStrings = false)]
            [Display(Name = "Email ou Usuário")]
            public string User { get; set; }

            [Required(ErrorMessage = "Informe a senha do usuário", AllowEmptyStrings = false)]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Mantenha-me conectado")]
            public bool RememberMe { get; set; }
        }
        public async Task<RedirectResult> OnGetAsync(string returnUrl = null)
        {
            // Redirecione diretamente para a página de Bluetooth, em vez de verificar a autenticação
            return Redirect("/ArmazenamentoInteligente"); // Substitua pelo caminho correto da página de Bluetooth
        }
   
        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                try
                {
                    // Valida Conexão com o banco de dados
                    if (IsServerConnected(_config.GetConnectionString("DefaultConnection")) == false)
                    {
                        ModelState.AddModelError("Input.User", "Sem conexão com banco de Dados");
                        return Page();
                    }

                    if (Input.User.Contains("@"))
                    {
                        // This doesn't count login failures towards account lockout
                        // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                        var result = await _signInManager.PasswordSignInAsync(Input.User, Input.Password, Input.RememberMe, lockoutOnFailure: false);
                        var exist = _context.Users.Local.ToList().Any(x => x.Email == Input.User);

                        if (result.RequiresTwoFactor)
                        {
                            return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
                        }
                        if (result.IsLockedOut)
                        {
                            _logger.LogWarning("Conta de usuário bloqueada.");
                            return RedirectToPage("./Lockout");
                        }
                        if (result.Succeeded)
                        {
                            _logger.LogInformation("Usuario conectado");
                            return LocalRedirect(returnUrl);
                        }
                        if (exist == false)
                        {
                            ModelState.AddModelError("Input.User", "Usuário não cadastrado.");
                            return Page();
                        }
                        if (exist && result.Succeeded == false)
                        {
                            ModelState.AddModelError("Input.Password", "Senha Incorreta.");
                            return Page();
                        }
                    }
                    else  // Autenticação com active directory 
                    {
                        //string[] groups = new string[] { };

                        //// Obtém todos os grupos do AD usando a classe PrincipalContext
                        //using (PrincipalContext context = new PrincipalContext(ContextType.Domain))
                        //{
                        //    GroupPrincipal groupPrincipal = new GroupPrincipal(context);
                        //    PrincipalSearcher search = new PrincipalSearcher(groupPrincipal);
                        //    PrincipalSearchResult<Principal> result = search.FindAll();

                        //    groups = new string[result.Count()];

                        //    int i = 0;
                        //    foreach (GroupPrincipal group in result)
                        //    {
                        //        groups[i] = group.Name;
                        //        i++;
                        //    }
                        //}
                        //var count = 0;
                        //foreach(var i in groups)
                        //{
                        //    count++;
                        //}
                        //string groupName = "";

                        //// Obtém o usuário do AD usando a classe PrincipalContext
                        //using (PrincipalContext context = new PrincipalContext(ContextType.Domain))
                        //{
                        //    UserPrincipal user = UserPrincipal.FindByIdentity(context, Input.User);

                        //    // Verifica se o usuário existe no AD
                        //    if (user != null)
                        //    {
                        //        // Obtém a lista de grupos do usuário
                        //        PrincipalSearchResult<Principal> groups2 = user.GetGroups();

                        //        // Verifica se o usuário está no grupo especificado
                        //        foreach (GroupPrincipal group in groups2)
                        //        {
                        //            groupName = group.Name;
                        //            break;
                        //        }
                        //    }
                        //}
                        //string sDomain = "192.168.11.2";
                        //string sDefaultOU = "ou=users,ou=system";
                        //string sServiceUser = Input.User;
                        //string sServicePassword = Input.Password;
                        //PrincipalContext oPrincipalContext = new PrincipalContext   (ContextType.Domain, sDomain, sDefaultOU, sServiceUser, sServicePassword);

                        //string domain = "192.168.11.2";
                        //string username = Input.User;
                        //string password = Input.Password;

                        //using (var context = new PrincipalContext(ContextType.Domain, domain, username, password))
                        //{
                        //    using (var groupPrincipal = new GroupPrincipal(context))
                        //    {
                        //        using (var searchPrincipal = new PrincipalSearcher(groupPrincipal))
                        //        {
                        //            var groups3 = searchPrincipal.FindAll();
                        //            foreach (var group in groups3)
                        //            {
                        //                if(group.Name == "Lynx" )
                        //                {
                        //                    Console.WriteLine(group);
                        //                }
                        //                if (group.Name == "Everyone")
                        //                {
                        //                    Console.WriteLine(group);
                        //                }
                        //                if (group.Name == "Authenticated Users")
                        //                {
                        //                    Console.WriteLine(group);
                        //                }
                        //                if(group.Name == "High Mandatory Level")
                        //                {
                        //                    Console.WriteLine(group);
                        //                }
                        //            }
                        //        }
                        //    }
                        //}
                        PrincipalContext ctx = new PrincipalContext(ContextType.Domain, "192.168.11.2");
                        UserPrincipal user = UserPrincipal.FindByIdentity(ctx, Input.User);

                        var groups = user.GetAuthorizationGroups();

                        var roleClaim = _context.RoleClaims
                            .Where(x => groups.Any(g => g.Name == x.ClaimValue))
                            .OrderByDescending(x => x.RoleId)
                            .FirstOrDefault();

                        string role = "";
                        if (roleClaim != null)
                        {
                            switch (roleClaim.RoleId)
                            {
                                case "1":
                                    role = "Admin";
                                    break;
                                case "2":
                                    role = "Gerente";
                                    break;
                                case "3":
                                    role = "Operador";
                                    break;
                                default:
                                    ModelState.AddModelError("Input.User", "Função não encontrada.");
                                    return Page();
                            }
                        }
                        else
                        {
                            ModelState.AddModelError("Input.User", "Usuário ou senha inválido.");
                            return Page();
                        }
                    }
                }
                catch (Exception ex)
                {
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
        public static bool IsServerConnected(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch (SqlException ex)
                {

                    return false;

                }
                finally
                {
                    try
                    {
                        connection.Close();
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
        }

    }
}
