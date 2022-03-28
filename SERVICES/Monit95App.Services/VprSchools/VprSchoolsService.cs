using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.VprSchools
{
    public class VprSchoolsService
    {
        private readonly CokoContext context;

        public VprSchoolsService(CokoContext context)
        {
            this.context = context;
        }

        public int CurrentWeekId { 
            get 
            {
                var currentDate = DateTime.Today;
                var weeks = context.VprWeeks.ToList();
                return context.VprWeeks.Single(p => p.StartDate <= currentDate && p.EndDate >= currentDate).Id;
            }
        }

        public IEnumerable<VprWeekSchoolDto> GetSchoolMarks(string schoolId, string classNumber, string subjectCode)
        {
            var currentWeekId = CurrentWeekId;
            var res = context.VprWeekSchools
                .Where(p => p.SchoolId == schoolId && p.ClassNumber == classNumber && p.SubjectCode == subjectCode && p.WeekId == currentWeekId)
                .Select(s => new VprWeekSchoolDto
                {
                    Id = s.Id,
                    ClassNumber = s.ClassNumber,
                    SubjectCode = s.SubjectCode,
                    VprSchoolMarks = s.VprSchoolMarks.Select(s1 => new VprSchoolMarkDto
                    {
                        Marks2 = s1.Marks2,
                        Marks3 = s1.Marks3,
                        Marks4 = s1.Marks4,
                        Marks5 = s1.Marks5,
                        ClassId = s1.ClassId
                    }),
                    HasError = s.HasError,
                    IsSecond = s.IsSecond,
                    AbleSendSecond = s.AbleSendSecond
                })
                .AsNoTracking()
                //.Include("VprSchoolMarks")
                .ToList();
            return res;
        }

        public void SaveSchoolMarks(VprWeekSchool weekSchool)
        {
            if (weekSchool.VprSchoolMarks == null || weekSchool.VprSchoolMarks.Count == 0)
            {
                throw new ArgumentException("Отсутствуют оценки");
            }

            var schoolMarks = GetSchoolMarks(weekSchool.SchoolId, weekSchool.ClassNumber, weekSchool.SubjectCode);
            if (schoolMarks.Count() == 2)
            {
                throw new ArgumentException("Нельзя больше сохранять результат на эту неделю");
            }

            if (weekSchool.VprSchoolMarks.Any(p => p.Marks2 + p.Marks3 + p.Marks4 + p.Marks5 != 100) && !weekSchool.HasError)
            {
                weekSchool.HasError = true;
            }
            weekSchool.WeekId = CurrentWeekId;
            context.VprWeekSchools.Add(weekSchool);
            context.SaveChanges();
        }

        public void SaveSecondChance(VprWeekSchool SecChance)
        {
         /* ClassNumber: this.selectedClass,
			SubjectCode: this.selectedSubject,
			VprSchoolMarks: null,
			HasError: true,
			IsSecond: true,
			AbleSendSecond: this.AbleSendSecond*/

            var collectorId = Convert.ToInt32(SecChance.ClassNumber);
            var schoolId = "0000";
            var entity = context.VprWeekSchools.Where(x => x.ClassNumber == SecChance.ClassNumber && x.SubjectCode == SecChance.SubjectCode && x.SchoolId == schoolId).Single();

            entity.AbleSendSecond = SecChance.AbleSendSecond;
            context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();

        }

        public VprStatisticsDto GetStatisticsForSubject(string schoolId, string classNumber, string subjectCode)
        {

            var subjectResults = context.VprWeekSchools.Where(p => p.SchoolId == schoolId && p.ClassNumber == classNumber && p.SubjectCode == subjectCode);
            var isSecond = subjectResults.Count();
            var secondRes = false;
            if (!subjectResults.Any())
            {
                return null;
            }
            else {
                var first = subjectResults.Single(p => p.IsSecond == false).VprSchoolMarks.Select(s => new VprSchoolMarkDto
                {
                    Marks2 = s.Marks2,
                    Marks3 = s.Marks3,
                    Marks4 = s.Marks4,
                    Marks5 = s.Marks5,
                    ClassId = s.ClassId
                }).OrderBy(ob => ob.ClassId);
                if(isSecond == 2)
                {
                    secondRes = true;
                }
                var second = subjectResults.Single(p => p.IsSecond == secondRes).VprSchoolMarks.Select(s => new VprSchoolMarkDto
            {
                Marks2 = s.Marks2,
                Marks3 = s.Marks3,
                Marks4 = s.Marks4,
                Marks5 = s.Marks5,
                ClassId = s.ClassId
            }).OrderBy(ob => ob.ClassId);
    
            var firstClasses = first.Select(s => s.ClassId);
            var secondClasses = second.Select(s => s.ClassId);
            var availableClasses = firstClasses.Union(secondClasses).OrderBy(ob => ob);

            VprStatisticsDto res = new VprStatisticsDto
            {
                Marks2 = new Dictionary<string, FirstAndSecond>(),
                Marks3 = new Dictionary<string, FirstAndSecond>(),
                Marks4 = new Dictionary<string, FirstAndSecond>(),
                Marks5 = new Dictionary<string, FirstAndSecond>()
            };


            foreach (var classId in availableClasses)
            {
                res.Marks2.Add(classId, new FirstAndSecond
                {
                    First = first.SingleOrDefault(p => p.ClassId == classId)?.Marks2.ToString(),
                    Second = second.SingleOrDefault(p => p.ClassId == classId)?.Marks2.ToString()
                });
                res.Marks3.Add(classId, new FirstAndSecond
                {
                    First = first.SingleOrDefault(p => p.ClassId == classId)?.Marks3.ToString(),
                    Second = second.SingleOrDefault(p => p.ClassId == classId)?.Marks3.ToString()
                });
                res.Marks4.Add(classId, new FirstAndSecond
                {
                    First = first.SingleOrDefault(p => p.ClassId == classId)?.Marks4.ToString(),
                    Second = second.SingleOrDefault(p => p.ClassId == classId)?.Marks4.ToString()
                });
                res.Marks5.Add(classId, new FirstAndSecond
                {
                    First = first.SingleOrDefault(p => p.ClassId == classId)?.Marks5.ToString(),
                    Second = second.SingleOrDefault(p => p.ClassId == classId)?.Marks5.ToString()
                });
            }
                System.Diagnostics.Debug.WriteLine(res);
                return res;
         }
        }
    
        public IEnumerable<string> GetClasses()
        {
            var weekSchools = context.VprWeekSchools.Where(p => p.IsSecond);
            return weekSchools.Select(ws => ws.ClassNumber).Distinct().OrderBy(ob => ob);
        }

        public IEnumerable<string> GetSubjects(string classNumber)
        {
            var weekSchools = context.VprWeekSchools.Where(p => p.IsSecond && p.ClassNumber == classNumber);
            return weekSchools.Select(ws => ws.SubjectCode).Distinct().OrderBy(ob => ob);
        }

        public IEnumerable<AreaDto> GetAreas(string classNumber, string subjectCode)
        {
            // For showing results even if results not entered yet
            if (classNumber == "bypass" && subjectCode == "bypass")
            {
                /*var areaCodes = context.Areas
                              .Where(p =>  p.Code != null)
                              .Select(ws => ws.School.AreaCode)
                              .Distinct();*/
                return context.Areas.Where(p => p.Code != 001).Select(a => new AreaDto
                {
                    Code = a.Code,
                    Name = a.Name
                })
                    .OrderBy(ob => ob.Code);
            }
            else
            {
                var areaCodes = context.VprWeekSchools
                                .Where(p => p.IsSecond && p.ClassNumber == classNumber && p.SubjectCode == subjectCode)
                                .Select(ws => ws.School.AreaCode)
                                .Distinct();
                return context.Areas.Where(p => areaCodes.Contains(p.Code)).Select(a => new AreaDto
                {
                    Code = a.Code,
                    Name = a.Name
                })
                    .OrderBy(ob => ob.Code);
            }
            
        }

        public IEnumerable<SchoolDto> GetSchools(string classNumber, string subjectCode, int areaCode)
        {
            if(classNumber == "classNumber")
            {
                return context.Schools.Where(s => s.AreaCode == areaCode && s.VprCode != "")
                .Select(s => new SchoolDto
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .OrderBy(ob => ob.Id);
            } else {
                var schoolIds = context.VprWeekSchools
                   .Where(p => /*p.IsSecond && */p.ClassNumber == classNumber && p.SubjectCode == subjectCode && p.School.AreaCode == areaCode)
                   .Select(ws => ws.SchoolId)
                   .Distinct();
                return context.Schools.Where(s => schoolIds.Contains(s.Id))
                    .Select(s => new SchoolDto
                    {
                        Id = s.Id,
                        Name = s.Name
                    })
                    .OrderBy(ob => ob.Id);
            }
           
        }
    }
}
