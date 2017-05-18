using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
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
            builder.RegisterType<ExerciseMarkService>().As<IExerciseMarkService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("exerciseMarkRep", new Repository<ExerciseMark>(new UnitOfWorkV2(new cokoContext()))), new NamedParameter("testRep", new Repository<Test>(new UnitOfWorkV2(new cokoContext()))) }); //исправить
            builder.RegisterType<TestResultV2Service>().As<ITestResultV2Service>().WithParameters(new List<Parameter> { new NamedParameter("testResultV2Rep", new Repository<TestResultsV2>(new UnitOfWorkV2(context))), new NamedParameter("exerciseMarkRep", new Repository<ExerciseMark>(new UnitOfWorkV2(context))) });
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();
            builder.RegisterType<ProjectParticipV2Service>().As<IProjectParticipV2Service>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("projectParticipV2Repository", new Repository<ProjectParticipsV2>(new UnitOfWorkV2(context))), new NamedParameter("classService", new ClassService(new UnitOfWorkV2(context), new Repository<Class>(new UnitOfWorkV2(context)))) });
            builder.RegisterType<ClassService>().As<IClassService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("classRepository", new Repository<Class>(new UnitOfWorkV2(context))) });
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}