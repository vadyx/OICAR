namespace WebServis.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class RegisteredUserModel : DbContext
    {
        public RegisteredUserModel()
            : base("name=RegisteredUserModel")
        {
        }

        public virtual DbSet<LoginCredential> LoginCredentials { get; set; }
        public virtual DbSet<RegisteredUser> RegisteredUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoginCredential>()
                .HasMany(e => e.RegisteredUsers)
                .WithRequired(e => e.LoginCredential)
                .HasForeignKey(e => e.LoginCredentialsID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<RegisteredUser>()
                .Property(e => e.Rating)
                .HasPrecision(3, 2);
        }
    }
}
