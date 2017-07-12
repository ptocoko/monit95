﻿using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipViewer : IRsurParticipViewer
    {
        private readonly string reportFolder = @"\\192.168.88.220\файлы_пто\nsur_reports";
        private cokoContext _db = new cokoContext();

        public RsurParticipBaseModel CreateModel(ProjectParticip entity)
        {
            var vm = new RsurParticipBaseModel
            {
                ProjectCode = entity.ProjectCode,
                ParticipCode = entity.ParticipCode,
                Surname = entity.Surname,
                Name = entity.Name,
                SecondName = entity.SecondName,
                SubjectName = entity.NsurSubject.Name,
                SchoolIdWithName = $"{entity.School.Id} - {entity.School.Name.Trim()}",
                CategName = entity.Category != null ? entity.Category.Name : "",
                Experience = entity.Experience ?? -1,
                Phone = entity.Phone ?? "",
                Email = entity.Email ?? "",
                Birthday = entity.Birthday,
                ClassNumbers = entity.ClassNumbers,
                HasRequestToEdit = _db.ProjectParticipsEdits.SingleOrDefault(p => p.ParticipCode == entity.ParticipCode) != null ? true : false
            };
            return vm;
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
