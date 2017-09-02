using System.Data.Entity;

using Monit95App.Domain.Core.Entities;

namespace Monit95App.Infrastructure.Data
{
    public partial class CokoContext : DbContext
    {
        public CokoContext()
            : base("name=CokoContext")
        {
        }

        public virtual DbSet<Area> Areas { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Class> Classes { get; set; }

        public virtual DbSet<Element> Elements { get; set; }

        public virtual DbSet<ElementType> ElementTypes { get; set; }

        public virtual DbSet<Exercis> Exercises { get; set; }

        public virtual DbSet<GiaResult> GiaResults { get; set; }

        public virtual DbSet<Grade> Grades { get; set; }

        public virtual DbSet<Particip> Particips { get; set; }

        public virtual DbSet<ParticipTest> ParticipTests { get; set; }

        public virtual DbSet<Project> Projects { get; set; }

        public virtual DbSet<ProjectTest> ProjectTests { get; set; }

        public virtual DbSet<PropertyType> PropertyTypes { get; set; }

        public virtual DbSet<Report> Reports { get; set; }

        public virtual DbSet<ReportStatistic> ReportStatistics { get; set; }

        public virtual DbSet<Result> Results { get; set; }

        public virtual DbSet<RsurParticipEdit> RsurParticipEdits { get; set; }

        public virtual DbSet<RsurParticip> RsurParticips { get; set; }

        public virtual DbSet<RsurParticipTest> RsurParticipTests { get; set; }

        public virtual DbSet<RsurSubject> RsurSubjects { get; set; }

        public virtual DbSet<RsurTestResult> RsurTestResults { get; set; }

        public virtual DbSet<RsurTest> RsurTests { get; set; }

        public virtual DbSet<SchoolEdit> SchoolEdits { get; set; }

        public virtual DbSet<School> Schools { get; set; }

        public virtual DbSet<Test> Tests { get; set; }

        public virtual DbSet<TownType> TownTypes { get; set; }

        public virtual DbSet<Wish> Wishes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>()
                .HasMany(e => e.Schools)
                .WithRequired(e => e.Area)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.Id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .HasMany(e => e.Particips)
                .WithRequired(e => e.Class)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Element>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Element>()
                .Property(e => e.ExerNames)
                .IsUnicode(false);

            modelBuilder.Entity<ElementType>()
                .HasMany(e => e.Elements)
                .WithRequired(e => e.ElementType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Exercis>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.DocumNum)
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.Marks)
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.Parts)
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.Elements)
                .IsUnicode(false);

            modelBuilder.Entity<GiaResult>()
                .Property(e => e.Skills)
                .IsUnicode(false);

            modelBuilder.Entity<Particip>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Particip>()
                .Property(e => e.ClassId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Particip>()
                .HasMany(e => e.ParticipTests)
                .WithRequired(e => e.Particip)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ParticipTest>()
                .HasOptional(e => e.Result)
                .WithRequired(e => e.ParticipTest);

            modelBuilder.Entity<Project>()
                .Property(e => e.ClassNumbers)
                .IsUnicode(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.GiaResults)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.Particips)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.ProjectTests)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.RsurTests)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectTest>()
                .HasMany(e => e.ParticipTests)
                .WithRequired(e => e.ProjectTest)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Report>()
                .Property(e => e.Year)
                .IsFixedLength();

            modelBuilder.Entity<Report>()
                .Property(e => e.Available)
                .IsUnicode(false);

            modelBuilder.Entity<Report>()
                .HasMany(e => e.ReportStatistics)
                .WithRequired(e => e.Report)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Result>()
                .Property(e => e.Marks)
                .IsUnicode(false);

            modelBuilder.Entity<Result>()
                .Property(e => e.ElementValues)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipEdit>()
                .Property(e => e.ParticipCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipEdit>()
                .Property(e => e.ClassNumbers)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipEdit>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipEdit>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipEdit>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.OldCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.ClassNumbers)
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .Property(e => e.SchoolFrom)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipTest>()
                .Property(e => e.RsurParticipOldCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticipTest>()
                .HasOptional(e => e.RsurTestResult)
                .WithRequired(e => e.RsurParticipTest);

            modelBuilder.Entity<RsurTestResult>()
                .Property(e => e.Marks)
                .IsUnicode(false);

            modelBuilder.Entity<RsurTestResult>()
                .Property(e => e.Parts)
                .IsUnicode(false);

            modelBuilder.Entity<RsurTestResult>()
                .Property(e => e.Elements)
                .IsUnicode(false);

            modelBuilder.Entity<RsurTest>()
                .HasMany(e => e.RsurParticipTests)
                .WithRequired(e => e.RsurTest)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SchoolEdit>()
                .Property(e => e.Id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<School>()
                .Property(e => e.Id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<School>()
                .Property(e => e.VprCode)
                .IsUnicode(false);

            modelBuilder.Entity<School>()
                .Property(e => e.Monit95Login)
                .IsUnicode(false);

            modelBuilder.Entity<School>()
                .HasMany(e => e.GiaResults)
                .WithRequired(e => e.School)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<School>()
                .HasMany(e => e.Particips)
                .WithRequired(e => e.School)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<School>()
                .HasOptional(e => e.SchoolEdit)
                .WithRequired(e => e.School);

            modelBuilder.Entity<Test>()
                .Property(e => e.NumberCode)
                .IsUnicode(false);

            modelBuilder.Entity<Test>()
                .Property(e => e.ExcerMaxMarks)
                .IsUnicode(false);

            modelBuilder.Entity<Test>()
                .HasMany(e => e.Elements)
                .WithRequired(e => e.Test)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Test>()
                .HasMany(e => e.Exercises)
                .WithRequired(e => e.Test)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Test>()
                .HasMany(e => e.Grades)
                .WithRequired(e => e.Test)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Test>()
                .HasMany(e => e.ProjectTests)
                .WithRequired(e => e.Test)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Test>()
                .HasMany(e => e.RsurTests)
                .WithRequired(e => e.Test)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<TownType>()
                .HasMany(e => e.Schools)
                .WithRequired(e => e.TownType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Wish>()
                .Property(e => e.UserId)
                .IsFixedLength()
                .IsUnicode(false);
        }
    }
}
