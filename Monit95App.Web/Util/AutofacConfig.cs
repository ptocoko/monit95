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
            //// получаем экземпляр контейнера
            //var builder = new ContainerBuilder();

            //// регистрируем контроллер в текущей сборке
            //builder.RegisterControllers(typeof(MvcApplication).Assembly);

            //// регистрируем споставление типов
            //builder.RegisterType<PParticipCodeCreator>().As<IPParticipCodeCreator>()
            //    .WithParameter("db", new cokoContext());

            //// создаем новый контейнер с теми зависимостями, которые определены выше
            //var container = builder.Build();

            //// установка сопоставителя зависимостей
            //DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<ExerciseMarkService>().As<IExerciseMarkService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(new cokoContext())), new NamedParameter("exerciseMarkRep", new Repository<ExerciseMark>(new UnitOfWorkV2(new cokoContext()))), new NamedParameter("testRep", new Repository<Test>(new UnitOfWorkV2(new cokoContext()))) });
            builder.RegisterType<TestResultV2Service>().As<ITestResultV2Service>().WithParameters(new List<Parameter> { new NamedParameter("testResultV2Rep", new Repository<TestResultsV2>(new UnitOfWorkV2(new cokoContext()))), new NamedParameter("exerciseMarkRep", new Repository<ExerciseMark>(new UnitOfWorkV2(new cokoContext()))) });
            builder.RegisterType<OneTwoThreeGradeConverter>().As<IGrade5>();
            builder.RegisterType<ProjectParticipV2Service>().As<IProjectParticipV2Service>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(new cokoContext())), new NamedParameter("projectParticipV2Repository", new Repository<ProjectParticipsV2>(new UnitOfWorkV2(new cokoContext()))), new NamedParameter("classService", new ClassService(new UnitOfWorkV2(new cokoContext()), new Repository<Class>(new UnitOfWorkV2(new cokoContext())))) });
            builder.RegisterType<ClassService>().As<IClassService>().WithParameters(new List<Parameter> { new NamedParameter("unitOfWork", new UnitOfWorkV2(new cokoContext())), new NamedParameter("classRepository", new Repository<Class>(new UnitOfWorkV2(new cokoContext()))) });
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}