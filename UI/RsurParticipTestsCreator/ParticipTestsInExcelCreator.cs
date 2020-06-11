using ClosedXML.Excel;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RsurParticipTestsCreator
{
    internal class ParticipTestsInExcelCreator
    {
        private readonly CokoContext _context;
        private readonly string examCode;
        private readonly string examName;

        public ParticipTestsInExcelCreator(CokoContext cokoContext, string examCode, string examName)
        {
            _context = cokoContext;
            this.examCode = examCode;
            this.examName = examName;
        }

        public IEnumerable<ParticipTestsInExcelModel> GetModels(int[] rsurTestIds)
        {
            return _context.RsurParticipTests
                .AsNoTracking()
                .Where(p => rsurTestIds.Contains(p.RsurTestId) && p.RsurParticip.School.AreaCode != 1000)
                .GroupBy(gb => new
                {
                    gb.RsurParticip.School.AreaCode,
                    gb.RsurTest.TestDate,
                    SubjectName = gb.RsurParticip.RsurSubject.Name
                })
                .Select(s => new ParticipTestsInExcelModel
                {
                    AreaCode = s.Key.AreaCode,
                    TestDate = s.Key.TestDate,
                    SubjectName = s.Key.SubjectName,
                    ParticipTests = s.Select(selector => new ParticipTestModel
                    {
                        Code = selector.RsurParticipCode,
                        Surname = selector.RsurParticip.Surname,
                        Name = selector.RsurParticip.Name,
                        SecondName = selector.RsurParticip.SecondName,
                        SchoolName = selector.RsurParticip.School.Name,
                        BlockName = selector.RsurTest.Test.Name,
                        NumberCode = selector.RsurTest.Test.NumberCode
                    })
                    .OrderBy(ob => ob.NumberCode)
                    .ThenBy(tb => tb.Code)
                    .ToList()
                }).ToArray();
        }

        public IEnumerable<ParticipTestsInExcelModelForSchool> GetModelsForSchools(int[] rsurTestIds)
        {
            return _context.RsurParticipTests
                .AsNoTracking()
                .Where(p => rsurTestIds.Contains(p.RsurTestId) && p.RsurParticip.School.AreaCode != 1000)
                .Include("RsurTest.Test")
                .Include("RsurParticip.RsurSubject")
                .ToList()
                .GroupBy(gb => new
                {
                    gb.RsurParticip.SchoolId,
                    gb.RsurTest.TestDate,
                    SubjectName = gb.RsurParticip.RsurSubject.Name
                })
                .Select(s => new ParticipTestsInExcelModelForSchool
                {
                    SchoolId = s.Key.SchoolId,
                    TestDate = s.Key.TestDate,
                    SubjectName = s.Key.SubjectName,
                    ParticipTests = s.Select(selector => new ParticipTestModel
                    {
                        Code = selector.RsurParticipCode,
                        Surname = selector.RsurParticip.Surname,
                        Name = selector.RsurParticip.Name,
                        SecondName = selector.RsurParticip.SecondName,
                        BlockName = selector.RsurTest.Test.Name,
                        NumberCode = selector.RsurTest.Test.NumberCode
                    })
                    .OrderBy(ob => ob.NumberCode)
                    .ThenBy(tb => tb.Code)
                    .ToList()
                }).ToArray();
        }

        public ParticipTestsInExcelModel GetModelByAreaCode(int[] rsurTestIds, int areaCode)
        {
            return GetModels(rsurTestIds).Single(p => p.AreaCode == areaCode);
        }

        public void SaveModelsIntoExcel(ParticipTestsInExcelModel models)
        {
            var destFolder = $@"\\192.168.88.223\файлы_пто\Работы\[2016-61] - рсур\Диагностика «{examName}»\распределения";
            var templatePath = @"\\192.168.88.223\файлы_пто\Работы\[2016-61] - рсур\templates\распределение.xlsx";
            var shortSubjectName = models.SubjectName.Substring(0, 2);

            using (var excel = new XLWorkbook(templatePath))
            {
                using (var sheet = excel.Worksheets.First())
                {
                    sheet.Name = shortSubjectName.ToUpper();
                    sheet.Cell(2, 3).Value = models.AreaCode;
                    sheet.Cell(1, 5).Value = models.TestDate.ToString("dd.MM.yyyy");
                    sheet.Cell(2, 5).Value = models.SubjectName;

                    ParticipTestModel pt;
                    for (int i = 8; i < models.ParticipTests.Count() + 8; i++)
                    {
                        pt = models.ParticipTests[i-8];
                        sheet.Cell(i, 1).Value = i-7;
                        sheet.Cell(i, 2).Value = pt.Code;
                        sheet.Cell(i, 3).Value = pt.Surname;
                        sheet.Cell(i, 4).Value = pt.Name;
                        sheet.Cell(i, 5).Value = pt.SecondName;
                        sheet.Cell(i, 6).Value = pt.SchoolName;
                        sheet.Cell(i, 7).Value = pt.BlockName;
                    }
                }

                excel.SaveAs($@"{destFolder}\{models.AreaCode}\{examCode}_{shortSubjectName.ToLower()}_распределение_{models.AreaCode}.xlsx");
            }
        }

        public void SaveModelsIntoExcelForSchool(ParticipTestsInExcelModelForSchool models)
        {
            var destFolder = $@"\\192.168.88.223\файлы_пто\Работы\[2016-61] - рсур\Диагностика «{examName}»\распределения\schools";
            var templatePath = @"\\192.168.88.223\файлы_пто\Работы\[2016-61] - рсур\templates\распределение_school.xlsx";
            var shortSubjectName = models.SubjectName.Substring(0, 2);

            using (var excel = new XLWorkbook(templatePath))
            {
                using (var sheet = excel.Worksheets.First())
                {
                    sheet.Name = shortSubjectName.ToUpper();
                    sheet.Cell(2, 3).SetDataType(XLCellValues.Text);
                    sheet.Cell(2, 3).SetValue<string>(models.SchoolId);
                    sheet.Cell(1, 5).Value = models.TestDate.ToString("dd.MM.yyyy");
                    sheet.Cell(2, 5).Value = models.SubjectName;

                    ParticipTestModel pt;
                    for (int i = 8; i < models.ParticipTests.Count() + 8; i++)
                    {
                        pt = models.ParticipTests[i - 8];
                        sheet.Cell(i, 1).Value = i - 7;
                        sheet.Cell(i, 2).Value = pt.Code;
                        sheet.Cell(i, 3).Value = pt.Surname;
                        sheet.Cell(i, 4).Value = pt.Name;
                        sheet.Cell(i, 5).Value = pt.SecondName;
                        sheet.Cell(i, 6).Value = pt.BlockName;
                    }
                }

                excel.SaveAs($@"{destFolder}\{models.SchoolId}\{examCode}_{shortSubjectName.ToLower()}_распределение_{models.SchoolId}.xlsx");
            }
        }
    }

    internal class ParticipTestsInExcelModel
    {
        public int AreaCode { get; set; }
        public DateTime TestDate { get; set; }
        public string SubjectName { get; set; }
        public IList<ParticipTestModel> ParticipTests { get; set; }
    }

    internal class ParticipTestsInExcelModelForSchool
    {
        public string SchoolId { get; set; }
        public DateTime TestDate { get; set; }
        public string SubjectName { get; set; }
        public IList<ParticipTestModel> ParticipTests { get; set; }
    }

    internal class ParticipTestModel
    {
        public int Code { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolName { get; set; }
        public string BlockName { get; set; }
        public string NumberCode { get; set; }
    }
}
