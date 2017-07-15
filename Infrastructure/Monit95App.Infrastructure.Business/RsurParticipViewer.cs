using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipViewer : IRsurParticipViewer
    {
        private const string reportFolder = @"\\192.168.88.220\файлы_пто\nsur_reports";
        private readonly cokoContext _db = new cokoContext();
        
        public RsurParticipBaseInfo CreateModel(ProjectParticip entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity", "RsurParticipViewer.CreateModel(ProjectParticip entity)");
            }
            var rsurParticipBaseInfo = new RsurParticipBaseInfo(entity);
                                   
            return rsurParticipBaseInfo;
        }

        public ParticipResultsModel CreateResultModel(TestResult entity, string participCode)
        {
            return new ParticipResultsModel
            {
                SubjectName = entity.ParticipTest.ProjectTest.Test.Name,
                TestDate = entity.ParticipTest.ProjectTest.TestDate,
                Marks = entity.Marks,
                Grade5 = entity.Grade5,
                TestId = entity.ParticipTest.ProjectTest.Test.Id.ToString(),
                NumberCode = entity.ParticipTest.ProjectTest.Test.NumberCode,
                ReportExisting = ReportIsExist(entity.ParticipTest.ProjectTest.Test.Id.ToString(), participCode)
            };
        }

        private bool ReportIsExist(string testId, string participCode)
        {
            if (System.IO.File.Exists($@"{reportFolder}\{testId}\{participCode}.pdf"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
