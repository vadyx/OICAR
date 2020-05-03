namespace WebServis.Models.Registration
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using WebServis.Models.Verification;
    using WebServis.Models.Login;

    public partial class RegisteredUserModel : DbContext
    {
        public RegisteredUserModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<LoginCredentials> LoginCredentials { get; set; }
        public virtual DbSet<RegisteredUser> RegisteredUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoginCredentials>()
                .HasMany(e => e.RegisteredUser)
                .WithRequired(e => e.LoginCredentials)
                .HasForeignKey(e => e.LoginCredentialsID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Verification>()
                .HasMany(e => e.RegisteredUser)
                .WithOptional(e => e.Verification)
                .HasForeignKey(e => e.VerificationID);

            modelBuilder.Entity<RegisteredUser>()
                .Property(e => e.Rating)
                .HasPrecision(3, 2);
        }
    }
}
