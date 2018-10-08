using Monit95App.Domain.Core.Entities;
using System.Data.Entity;

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
        public virtual DbSet<Collector> Collectors { get; set; }
        public virtual DbSet<Document> Documents { get; set; }        
        public virtual DbSet<Exercis> Exercises { get; set; }
        public virtual DbSet<File> Files { get; set; }
        public virtual DbSet<GiaResult> GiaResults { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }              
        public virtual DbSet<Particip> Particips { get; set; }
        public virtual DbSet<ParticipTest> ParticipTests { get; set; }
        public virtual DbSet<ParticipsCompetence> ParticipsCompetences { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTest> ProjectTests { get; set; }
        public virtual DbSet<PropertyType> PropertyTypes { get; set; }        
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<Repository> Repositories { get; set; }   
        public virtual DbSet<Result> Results { get; set; }
        public virtual DbSet<RsurParticipEdit> RsurParticipEdits { get; set; }
        public virtual DbSet<RsurParticip> RsurParticips { get; set; }
        public virtual DbSet<RsurParticipTest> RsurParticipTests { get; set; }
        public virtual DbSet<RsurReport> RsurReports { get; set; }
        public virtual DbSet<RsurReportFile> RsurReportFiles { get; set; }
        public virtual DbSet<RsurSubject> RsurSubjects { get; set; }
        public virtual DbSet<RsurTestResult> RsurTestResults { get; set; }
        public virtual DbSet<RsurTest> RsurTests { get; set; }
        public virtual DbSet<SchoolCollector> SchoolCollectors { get; set; }
        public virtual DbSet<SchoolEdit> SchoolEdits { get; set; }
        public virtual DbSet<School> Schools { get; set; }  
        public virtual DbSet<SchoolReportsCollector> SchoolReportsCollectors { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<TownType> TownTypes { get; set; }        
        public virtual DbSet<Wish> Wishes { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<FilePermission> FilePermissions { get; set; }
        public virtual DbSet<Monit95User> Monit95Users { get; set; }
        public virtual DbSet<EgeQuestion> EgeQuestions { get; set; }
        public virtual DbSet<RsurQuestion> RsurQuestions { get; set; }
        public virtual DbSet<QuestionMark> QuestionMarks { get; set; }
        public virtual DbSet<OneTwoThreeQuestion> OneTwoThreeQuestions { get; set; }
        public virtual DbSet<OneTwoThreeQuestionMark> OneTwoThreeQuestionMarks { get; set; }
        public virtual DbSet<TwoThreeResult> TwoThreeResults { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Result>()
                .HasRequired(e => e.ParticipTest)
                .WithOptional(e => e.Result);

            modelBuilder.Entity<Result>()
                .HasKey(e => e.ParticipTestId);

            modelBuilder.Entity<OneTwoThreeQuestion>()
                .HasMany(e => e.OneTwoThreeQuestionMarks)
                .WithRequired(e => e.OneTwoThreeQuestion)
                .HasForeignKey(e => e.OneTwoThreeQuestionId);

            modelBuilder.Entity<SchoolReportsCollector>()
                .HasRequired(e => e.School)
                .WithMany(e => e.SchoolReportsCollectors);

            modelBuilder.Entity<SchoolReportsCollector>()
                .HasRequired(e => e.Report)
                .WithMany(e => e.SchoolReportsCollectors)
                .HasForeignKey(e => e.ProjectId);

            modelBuilder.Entity<Monit95User>()
                .ToTable("Monit95Users");

            modelBuilder.Entity<Monit95User>()
                .HasKey(e => e.Login);

            modelBuilder.Entity<File>()
                .HasMany(e => e.RsurReportFiles)
                .WithRequired(e => e.File)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<RsurReport>()
                .HasMany(e => e.RsurReportFiles)
                .WithRequired(e => e.RsurReport)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Repository>()
                .HasMany(e => e.Files)
                .WithRequired(e => e.Repository)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Area>()
                .HasMany(e => e.Schools)
                .WithRequired(e => e.Area)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.RsurParticips)
                .WithOptional(e => e.Category)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Class>()
                .HasMany(e => e.Particips)
                .WithOptional(e => e.Class)
                .HasForeignKey(e => e.ClassId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.Id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Collector>()
                .HasMany(e => e.SchoolCollectors)
                .WithRequired(e => e.Collector)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Document>()
                .Property(e => e.Available)
                .IsUnicode(false);

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
                .Property(e => e.SchoolIdFrom)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<RsurParticip>()
                .HasMany(e => e.RsurParticipTests)
                .WithRequired(e => e.RsurParticip)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<RsurParticipTest>()
                .HasOptional(e => e.RsurTestResult)
                .WithRequired(e => e.RsurParticipTest);

            modelBuilder.Entity<RsurSubject>()
                .HasMany(e => e.RsurParticips)
                .WithRequired(e => e.RsurSubject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<RsurTestResult>()
                .Property(e => e.RsurQuestionValues)
                .IsUnicode(false);

            modelBuilder.Entity<RsurTestResult>()
                .Property(e => e.EgeQuestionValues)
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

            modelBuilder.Entity<SchoolCollector>()
                .Property(e => e.SchoolId)
                .IsFixedLength()
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
                .HasMany(e => e.RsurParticips)
                .WithRequired(e => e.School)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<School>()
                .HasMany(e => e.SchoolCollectors)
                .WithRequired(e => e.School)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<School>()
                .HasOptional(e => e.SchoolEdit)
                .WithRequired(e => e.School);

            modelBuilder.Entity<EgeQuestion>()
                .HasMany(e => e.RsurQuestions);                

            modelBuilder.Entity<Test>()
                .Property(e => e.NumberCode)
                .IsUnicode(false);

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
