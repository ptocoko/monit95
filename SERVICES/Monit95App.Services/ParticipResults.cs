using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Services
{
    public class ParticipResults : IParticipResults
    {
        private readonly CokoContext context;

        //private readonly IGenericRepository<Result> _resultRepository;

        public ParticipResults(CokoContext context)
        {
            this.context = context;
            //_resultRepository = resultRepository;
        }

        public FirstClassReportDto GetClassParticipReportDto(int participTestId)
        {
            var participRes = context.Results.Where(p => p.ParticipTestId == participTestId && p.PrimaryMark != null).ToList().Select(GetReportDto()).Single();

            return participRes;
        }

        public IEnumerable<FirstClassReportDto> GetListClassParticipReportDto(ICollection<int> participTestIds)
        {
            var participsRes = context.Results.Where(p => participTestIds.Contains(p.ParticipTestId) && p.PrimaryMark != null).ToList().Select(GetReportDto()).ToList();

            return participsRes;
        }

        private static Func<Result, FirstClassReportDto> GetReportDto()
        {
            //throw new NotImplementedException();
            return s => new FirstClassReportDto
            {
                SchoolParticipInfo = new Domain.Core.SchoolParticip
                {
                    Surname = s.ParticipTest.Particip.Surname.Trim(),
                    Name = s.ParticipTest.Particip.Name.Trim(),
                    SecondName = s.ParticipTest.Particip.SecondName?.Trim(),
                    SchoolName = s.ParticipTest.Particip.School.Name.Trim()
                },
                ClassName = s.ParticipTest.Particip.Class.Name.Trim(),
                ParticipTestId = s.ParticipTestId,
                PrimaryMark = s.PrimaryMark,
                Marks = s.Marks.Split(';').Select(sel => sel.Replace('/', '.').Replace(@"\", ".")).ToArray(),
                GradeGroup = SetGradeGroupName(s.Grade5.ToString())
            };
        }

        private static string SetGradeGroupName(string grade5)
        {
            switch (grade5)
            {
                case "2":
                    return "«Группа экстра-риска»";
                case "3":
                    return "«Группа риска»";
                case "4":
                    return "«Стабильная середина»";
                case "5":
                    return "«Высокая возрастная норма»";
                default:
                    throw new FormatException("Недопустимое значение Grade5");
            }
        }
    }
}
