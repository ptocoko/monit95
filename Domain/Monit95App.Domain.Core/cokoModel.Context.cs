﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Monit95App.Domain.Core
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class cokoContext : DbContext
    {
        public cokoContext()
            : base("name=cokoContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ExerciseMark> ExerciseMarks { get; set; }
        public virtual DbSet<GiaResult> GiaResults { get; set; }
        public virtual DbSet<NsurSubject> NsurSubjects { get; set; }
        public virtual DbSet<ParticipTest> ParticipTests { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTest> ProjectTests { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<ReportStatistic> ReportStatistics { get; set; }
        public virtual DbSet<TownType> TownTypes { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<ProjectParticipsV2> ProjectParticipsV2 { get; set; }
        public virtual DbSet<TestResult> TestResults { get; set; }
        public virtual DbSet<TestResultsV2> TestResultsV2 { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }
        public virtual DbSet<Element> Elements { get; set; }
        public virtual DbSet<ElementType> ElementTypes { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<ProjectParticip> ProjectParticips { get; set; }
        public virtual DbSet<ProjectParticipsEdit> ProjectParticipsEdits { get; set; }
    }
}