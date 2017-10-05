using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core.Entities;
using System.Data.Entity.SqlServer;

namespace Monit95App.Services
{
    public class ParticipResults : IParticipResults
    {
        private readonly IGenericRepository<Result> _resultRepository;

        public ParticipResults(IGenericRepository<Result> resultRepository)
        {
            _resultRepository = resultRepository;
        }

        public ClassParticipReportDto GetClassParticipReportDto(int participTestId)
        {
            var participRes = _resultRepository.GetAll().Where(p => p.ParticipTestId == participTestId && p.PrimaryMark != null).ToList().Select(GetReportDto()).Single();

            return participRes;
        }

        public IEnumerable<ClassParticipReportDto> GetListClassParticipReportDto(ICollection<int> participTestIds)
        {
            var participsRes = _resultRepository.GetAll().Where(p => participTestIds.Contains(p.ParticipTestId) && p.PrimaryMark != null).ToList().Select(GetReportDto()).ToList();

            return participsRes;
        }

        private static Func<Result, ClassParticipReportDto> GetReportDto()
        {
            return s => new ClassParticipReportDto
            {
                Fio = $"{s.ParticipTest.Particip.Surname.Trim()} {s.ParticipTest.Particip.Name.Trim()} {s.ParticipTest.Particip.SecondName?.Trim()}",
                ClassName = s.ParticipTest.Particip.Class.Name.Trim(),
                ParticipTestId = s.ParticipTestId,
                PrimaryMark = s.PrimaryMark,
                SchoolName = s.ParticipTest.Particip.School.Name.Trim(),
                Marks = s.Marks.Split(';'),
                GradeGroup = SetGradeGroupName(s.Grade5.ToString())
            };
        }

        private static string SetGradeGroupName(string grade5)
        {
            switch (grade5)
            {
                case "2":
                    return "группа экстра-риска";
                case "3":
                    return "группа риска";
                case "4":
                    return "стабильная группа";
                case "5":
                    return "высокая возрастная группа";
                default:
                    throw new FormatException("Недопустимое значение Grade5");
            }
        }
    }
}
