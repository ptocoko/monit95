using Monit95App.Domain.Core;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services
{
    public class RsurParticipViewer : IRsurParticipViewer
    {
        private const string reportFolder = @"\\192.168.88.220\файлы_пто\nsur_reports";
        private readonly CokoContext _db = new CokoContext();
        
        public RsurParticipBaseInfo CreateModel(RsurParticip entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "RsurParticipViewer.CreateModel(ProjectParticip entity)");
            }
            var rsurParticipBaseInfo = new RsurParticipBaseInfo();
            rsurParticipBaseInfo.TemplateMethod(entity);
                                   
            return rsurParticipBaseInfo;
        }

        public ParticipResultsModel CreateResultModel(Result entity, string participCode)
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

        public ParticipResultsModel CreateResultModel(RsurTestResult entity, string participCode)
        {
            throw new NotImplementedException();
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
