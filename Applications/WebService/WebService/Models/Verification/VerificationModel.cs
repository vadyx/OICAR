namespace WebServis.Models.Verification
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VerificationModel : DbContext
    {
        public VerificationModel()
            : base("name=apiCS")
        {
        }
        public virtual DbSet<Verification> Verification { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
