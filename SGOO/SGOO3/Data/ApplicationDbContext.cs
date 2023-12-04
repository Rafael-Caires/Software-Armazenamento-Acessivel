using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SGOO3.Models.Entities;

namespace SGOO3.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        #region SGOO Entities

        public DbSet<Balanca> Balanca { get; set; }
        public DbSet<Configuracao> Configuracao { get; set; }
        public DbSet<Produto> Produto { get; set; }

       // public DbSet<StackQualityContractual> StackQualityContractual { get; set; }
        #endregion

    }
}