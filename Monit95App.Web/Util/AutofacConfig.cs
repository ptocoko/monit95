﻿using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Monit95App.Models;
using Monit95App.Web.Services;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur;
using Monit95App.Services.School;

namespace Monit95App.Util
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {      
            //var context = new cokoContext();
            //context.Database.Initialize(false);

            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register individual components            
            
            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>));                       
            builder.RegisterType<ParticipService>().As<IParticipService>();            
            builder.RegisterType<ClassService>().As<IClassService>();
            builder.RegisterType<RsurParticipService>().As<IRsurParticipService>();
            builder.RegisterType<RsurParticipEditService>().As<IRsurParticipEditService>();
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();
            builder.RegisterType<RsurParticipViewer>().As<IRsurParticipViewer>();
            builder.RegisterType<UserService>().As<IUserService>();
            builder.RegisterType<RsurReportModelXlsxConverter>().As<IRsurReportModelConverter>();
            builder.RegisterType<SchoolEditService>().As<ISchoolEditService>();
            builder.RegisterType<SchoolService>().As<ISchoolService>();
            builder.RegisterType<ClassParticipImporter>().As<IClassParticipImporter>();
            builder.RegisterType<ClassParticipConverter>().As<IClassParticipConverter>();
            builder.RegisterType<MarksService>().As<IMarksService>();
             
            builder.RegisterType<ApplicationDbContext>();
            //

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}