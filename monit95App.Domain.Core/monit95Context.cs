namespace monit95App.Domain.Core
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class monit95Context : DbContext
    {
        public monit95Context()
            : base("name=monit95Context")
        {
        }

        public virtual DbSet<Report> Reports { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Report>()
                .Property(e => e.year)
                .IsFixedLength();
        }
    }
}
