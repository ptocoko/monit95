namespace monit95App.Domain.Core
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class cokoContext : DbContext
    {
        public cokoContext()
            : base("name=cokoContext")
        {
        }

        public virtual DbSet<area> areas { get; set; }
        public virtual DbSet<monit10_1516_el> monit10_1516_el { get; set; }
        public virtual DbSet<monit10_1516_elvalue> monit10_1516_elvalue { get; set; }
        public virtual DbSet<monit10_1516_learner> monit10_1516_learner { get; set; }
        public virtual DbSet<monit10_1516_planoo> monit10_1516_planoo { get; set; }
        public virtual DbSet<monit10_1516_rating> monit10_1516_rating { get; set; }
        public virtual DbSet<school> schools { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<area>()
                .Property(e => e.AreaName)
                .IsFixedLength();

            modelBuilder.Entity<area>()
                .HasMany(e => e.schools)
                .WithRequired(e => e.area)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<monit10_1516_el>()
                .HasMany(e => e.monit10_1516_planoo)
                .WithRequired(e => e.monit10_1516_el)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<monit10_1516_el>()
                .HasMany(e => e.monit10_1516_rating)
                .WithRequired(e => e.monit10_1516_el)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<monit10_1516_learner>()
                .HasMany(e => e.monit10_1516_rating)
                .WithRequired(e => e.monit10_1516_learner)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<school>()
                .HasMany(e => e.monit10_1516_learner)
                .WithRequired(e => e.school)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<school>()
                .HasMany(e => e.monit10_1516_planoo)
                .WithRequired(e => e.school)
                .WillCascadeOnDelete(false);
        }
    }
}
