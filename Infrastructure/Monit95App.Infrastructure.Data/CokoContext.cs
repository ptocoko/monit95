namespace Monit95App.Infrastructure.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Monit95App.Domain.Core;

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
        public virtual DbSet<ExerciseMark> ExerciseMarks { get; set; }
        public virtual DbSet<GiaResult> GiaResults { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }
        public virtual DbSet<NsurSubject> NsurSubjects { get; set; }
        public virtual DbSet<Particip> Particips { get; set; }
        public virtual DbSet<ParticipTest> ParticipTests { get; set; }
        public virtual DbSet<ProjectParticipEdit> ProjectParticipEdits { get; set; }
        public virtual DbSet<ProjectParticip> ProjectParticips { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTest> ProjectTests { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<SchoolEdit> SchoolEdits { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<TestExercis> TestExercises { get; set; }
        public virtual DbSet<TestResult> TestResults { get; set; }
        public virtual DbSet<TestResultsV2> TestResultsV2 { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<TownType> TownTypes { get; set; }
        public virtual DbSet<Wish> Wishes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>()
                .HasMany(e => e.Schools)
                .WithRequired(e => e.Area)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.ProjectParticips)
                .WithRequired(e => e.Category)
                .HasForeignKey(e => e.CategId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.Id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .HasMany(e => e.Particips)
                .WithRequired(e => e.Class)
                .HasForeignKey(e => e.ClassCode)
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

            modelBuilder.Entity<ExerciseMark>()
                .Property(e => e.Marks)
                .IsUnicode(false);

            modelBuilder.Entity<ExerciseMark>()
                .HasMany(e => e.TestResultsV2)
                .WithRequired(e => e.ExerciseMark)
                .WillCascadeOnDelete(false);

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

            modelBuilder.Entity<NsurSubject>()
                .HasMany(e => e.ProjectParticips)
                .WithRequired(e => e.NsurSubject)
                .HasForeignKey(e => e.NSubjectCode)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Particip>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Particip>()
                .Property(e => e.ClassCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Particip>()
                .HasMany(e => e.ExerciseMarks)
                .WithRequired(e => e.Particip)
                .HasForeignKey(e => e.ProjectParticipId);

            modelBuilder.Entity<ParticipTest>()
                .Property(e => e.ParticipCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ParticipTest>()
                .HasOptional(e => e.TestResult)
                .WithRequired(e => e.ParticipTest);

            modelBuilder.Entity<ProjectParticipEdit>()
                .Property(e => e.ParticipCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticipEdit>()
                .Property(e => e.ClassNumbers)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticipEdit>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticipEdit>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticipEdit>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .Property(e => e.ParticipCode)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .Property(e => e.Phone)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .Property(e => e.ClassNumbers)
                .IsUnicode(false);

            modelBuilder.Entity<ProjectParticip>()
                .HasMany(e => e.ParticipTests)
                .WithRequired(e => e.ProjectParticip)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProjectParticip>()
                .HasOptional(e => e.ProjectParticipEdit)
                .WithRequired(e => e.ProjectParticip);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.GiaResults)
                .WithRequired(e => e.Project)
                .HasForeignKey(e => e.ProjectId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.ProjectParticips)
                .WithRequired(e => e.Project)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.ProjectTests)
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
                .HasMany(e => e.ProjectParticips)
                .WithRequired(e => e.School)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<School>()
                .HasOptional(e => e.SchoolEdit)
                .WithRequired(e => e.School);

            modelBuilder.Entity<TestExercis>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<TestResult>()
                .Property(e => e.Marks)
                .IsUnicode(false);

            modelBuilder.Entity<TestResult>()
                .Property(e => e.Parts)
                .IsUnicode(false);

            modelBuilder.Entity<TestResult>()
                .Property(e => e.Elements)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsV2>()
                .Property(e => e.Elements)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsV2>()
                .Property(e => e.Skills)
                .IsUnicode(false);

            modelBuilder.Entity<TestResultsV2>()
                .Property(e => e.Parts)
                .IsUnicode(false);

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
                .HasMany(e => e.ExerciseMarks)
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
                .HasMany(e => e.TestExercises)
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
