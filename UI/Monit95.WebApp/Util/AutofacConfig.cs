using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Services;
using Monit95App.Services.File;
using Monit95App.Services.FirstClass.Protocols;
using Monit95App.Services.Interfaces;
using Monit95App.Services.ItakeEge.Participant;
using Monit95App.Services.ItakeEge.QuestionProtocol;
using Monit95App.Services.ItakeEge.QuestionResult;
using Monit95App.Services.Rsur;
using Monit95App.Services.Rsur.ParticipReport;
using Monit95App.Services.Rsur.QuestionValue;
using Monit95App.Services.Rsur.SeminarReport;
using Monit95App.Services.School;
using Monit95App.Services.SchoolFiles;
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
            builder.RegisterType<QuestionValueService>().As<IQuestionValueService>();
            builder.RegisterType<ParticipReportService>().As<IParticipReportService>();
            builder.RegisterType<RatingService>().As<IRatingService>();
            builder.RegisterType<SeminarReportService>().As<ISeminarReportService>();
            builder.RegisterType<FileService>().As<IFileService>();
            builder.RegisterType<QuestionProtocolService>().As<IQuestionProtocolService>();
            builder.RegisterType<ReportMetaHandler>().As<IReportMetaHandler>();
            builder.RegisterType<Monit95App.Services.OneTwoThree.Particips.ParticipService>().As<Monit95App.Services.OneTwoThree.Particips.IParticipService>();
            builder.RegisterType<Monit95App.Services.OneTwoThree.QuestionProtocol.QuestionProtocolService>().As<Monit95App.Services.OneTwoThree.QuestionProtocol.IQuestionProtocolService>();
            builder.RegisterType<Monit95App.Services.FirstClass.Dtos.ParticipService>().As<Monit95App.Services.FirstClass.Dtos.IParticipService>();
            builder.RegisterType<ProtocolService>();
            builder.RegisterType<AreasService>();
            builder.RegisterType<CardsGenerator>();

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}