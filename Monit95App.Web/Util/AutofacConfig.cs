using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Domain.DTO;
using Monit95App.Domain.DTO.Interfaces;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Monit95App.Util
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {      
            var context = new cokoContext();
            context.Database.Initialize(false);

            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register individual components            
            builder.RegisterType<UnitOfWorkV2>().As<IUnitOfWork>().WithParameter("context", new cokoContext());       
            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IGenericRepository<>));            
            builder.RegisterType<ExerciseMarkService>().As<IExerciseMarkService>();            
            builder.RegisterType<TestResultV2Service>().As<ITestResultV2Service>();            
            builder.RegisterType<ParticipService>().As<IParticipService>();            
            builder.RegisterType<ClassService>().As<IClassService>();            
            builder.RegisterType<RsurParticipEditService>().As<IRsurParticipEditService>();
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();            

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}