﻿using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur;
using Monit95App.Services.Rsur.ParticipReport;
using Monit95App.Services.Rsur.SeminarReport;
using Monit95App.Services.Rsur.TestResult;
using Monit95App.Services.School;
using Monit95App.Web.Services;

namespace Monit95.WebApp.Util
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {      
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register DbContext
            builder.RegisterType<CokoContext>().InstancePerRequest();

            builder.RegisterType<ApplicationDbContext>();
            //builder.RegisterType<ModelStateDictionary>();

            // Register individual components            
            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>));                       
            builder.RegisterType<ParticipService>().As<IParticipService>();            
            builder.RegisterType<ClassService>().As<IClassService>();
            builder.RegisterType<RsurParticipService>().As<IRsurParticipService>();
            builder.RegisterType<RsurParticipEditService>().As<IRsurParticipEditService>();
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();
            builder.RegisterType<AccountService>().As<IAccountService>();
            builder.RegisterType<RsurReportModelXlsxConverter>().As<IRsurReportModelConverter>();
            builder.RegisterType<SchoolEditService>().As<ISchoolEditService>();
            builder.RegisterType<SchoolService>().As<ISchoolService>();
            builder.RegisterType<ClassParticipImporter>().As<IClassParticipImporter>();
            builder.RegisterType<ClassParticipConverter>().As<IClassParticipConverter>();
            builder.RegisterType<MarksService>().As<IMarksService>();
            builder.RegisterType<RsurMarksService>().As<IRsurMarksProtocolService>();
            builder.RegisterType<ParticipResults>().As<IParticipResults>();
            builder.RegisterType<TestResultService>().As<ITestResultService>();
            builder.RegisterType<ParticipReportService>().As<IParticipReportService>();
            builder.RegisterType<RatingService>().As<IRatingService>();
            builder.RegisterType<SeminarReportService>().As<ISeminarReportService>();            

             var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}