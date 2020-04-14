namespace WebServis.Models.Login
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class LoginCredentialsModel : DbContext
    {
        public LoginCredentialsModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<LoginCredentials> LoginCredentials { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
