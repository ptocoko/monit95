using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
using Monit95App.Services.Interfaces;
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
            builder.RegisterType<ExerciseMarkService>().As<IExerciseMarkService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("exerciseMarkRep", new GenericRepository<ExerciseMark>(new UnitOfWorkV2(new cokoContext()))), new NamedParameter("testRep", new GenericRepository<Test>(new UnitOfWorkV2(new cokoContext()))) }); //исправить
            builder.RegisterType<TestResultV2Service>().As<ITestResultV2Service>().WithParameters(new List<Parameter> { new NamedParameter("testResultV2Rep", new GenericRepository<TestResultsV2>(new UnitOfWorkV2(context))), new NamedParameter("exerciseMarkRep", new GenericRepository<ExerciseMark>(new UnitOfWorkV2(context))) });
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();
            builder.RegisterType<ParticipService>().As<IParticipService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("projectParticipV2Repository", new GenericRepository<ProjectParticipsV2>(new UnitOfWorkV2(context))), new NamedParameter("classService", new ClassService(new UnitOfWorkV2(context), new GenericRepository<Class>(new UnitOfWorkV2(context)))) });
            builder.RegisterType<ClassService>().As<IClassService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("classRepository", new GenericRepository<Class>(new UnitOfWorkV2(context))) });
            builder.RegisterType<RsurParticipEditService>().As<IRsurParticipEditService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(context)), new NamedParameter("participEditRepository", new GenericRepository<ProjectParticipsEdit>(new UnitOfWorkV2(context))) });
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}