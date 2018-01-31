using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services
{
    public class ParticipResults : IParticipResults
    {
        //private readonly IGenericRepository<Result> _resultRepository;

        //public ParticipResults(IGenericRepository<Result> resultRepository)
        //{
        //    _resultRepository = resultRepository;
        //}

        //    public ClassParticipReport GetClassParticipReportDto(int participTestId)
        //    {
        //        var participRes = _resultRepository.GetAll().Where(p => p.ParticipTestId == participTestId && p.PrimaryMark != null).ToList().Select(GetReportDto()).Single();

        //        return participRes;
        //    }

        //    public IEnumerable<ClassParticipReport> GetListClassParticipReportDto(ICollection<int> participTestIds)
        //    {
        //        var participsRes = _resultRepository.GetAll().Where(p => participTestIds.Contains(p.ParticipTestId) && p.PrimaryMark != null).ToList().Select(GetReportDto()).ToList();

        //        return participsRes;
        //    }

        //    private static Func<Result, ClassParticipReport> GetReportDto()
        //    {
        //        throw new NotImplementedException();
        //        //return s => new ClassParticipReport
        //        //{
        //        //    SchoolParticipInfo = new Domain.Core.SchoolParticip
        //        //    {
        //        //        Surname = s.ParticipTest.Particip.Surname.Trim(),
        //        //        Name = s.ParticipTest.Particip.Name.Trim(),
        //        //        SecondName = s.ParticipTest.Particip.SecondName?.Trim(),
        //        //        SchoolName = s.ParticipTest.Particip.School.Name.Trim()
        //        //    },
        //        //    ClassName = s.ParticipTest.Particip.Class.Name.Trim(),
        //        //    ParticipTestId = s.ParticipTestId,
        //        //    PrimaryMark = s.PrimaryMark,
        //        //    Marks = s.Marks.Split(';').Select(sel => sel.Replace('/', '.').Replace(@"\", ".")).ToArray(),
        //        //    GradeGroup = SetGradeGroupName(s.Grade5.ToString())
        //        //};
        //    }

        //    private static string SetGradeGroupName(string grade5)
        //    {
        //        switch (grade5)
        //        {
        //            case "2":
        //                return "«Группа экстра-риска»";
        //            case "3":
        //                return "«Группа риска»";
        //            case "4":
        //                return "«Стабильная середина»";
        //            case "5":
        //                return "«Высокая возрастная норма»";
        //            default:
        //                throw new FormatException("Недопустимое значение Grade5");
        //        }
        //    }
    }
}
