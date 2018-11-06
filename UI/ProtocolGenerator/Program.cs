using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.OneTwoThree.QuestionProtocol;
using ProtocolGenerator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace OneTwoThreeReporter
{
    class Program
    {
        //static IGenericRepository<Result> _testResults;
        //static IGenericRepository<School> _schools;
        //static List<Class> _classes;
        //static IGrade5 _gradeConverter;
        //static CokoContext _context;

        static void Main(string[] args)
        {
            var context = new CokoContext();
            var iTakeEge = new ITakeEge(destFolderPath: @"D:\Work", templateName: "template new oge.xlsx", context: context, projectId: 18);
            //var rsur = new RsurStatsAndReports(context);

            ////iTakeEge.GenerateReportsForSchools(new string[] { "0012", "0015", "0019", "0025", "0028", "0043", "0059", "0068", "0078", "0090", "0129", "0132", "0141", "0150", "0160", "0171", "0203", "0208", "0213", "0218", "0219", "0228", "0229", "0232", "0235", "0241", "0242", "0245", "0246", "0254", "0264", "0269", "0277", "0293", "0297", "0299", "0303", "0304", "0307", "0309", "0311", "0313", "0319", "0323", "0327", "0328", "0330", "0339", "0347", "0352", "0358", "0362", "0363", "0364", "0366", "0367", "0369", "0370", "0379", "0380", "0381", "0382", "0389", "0393", "0394", "0395", "0398", "0401", "0409", "0411", "0413", "0416", "0419", "0421", "0426", "0427", "0431", "0432", "0434", "0436", "0437", "0445", "0451", "0456", "0458", "0460", "0462", "0469", "0557" });
            //var gradeSolver = new GradeSolver();
            //var oneTwoThree = new OneTwoThree(context, gradeSolver, 14);

            //oneTwoThree.GenerateExcelReports(new string[] { "0012", "0015", "0019", "0025", "0028", "0043", "0059", "0068", "0078", "0090", "0129", "0132", "0141", "0150", "0160", "0171", "0203", "0208", "0213", "0218", "0219", "0228", "0229", "0232", "0235", "0241", "0242", "0245", "0246", "0254", "0264", "0269", "0277", "0293", "0297", "0299", "0303", "0304", "0307", "0309", "0311", "0313", "0319", "0323", "0327", "0328", "0330", "0339", "0347", "0352", "0358", "0362", "0363", "0364", "0366", "0367", "0369", "0370", "0379", "0380", "0381", "0382", "0389", "0393", "0394", "0395", "0398", "0401", "0409", "0411", "0413", "0416", "0419", "0421", "0426", "0427", "0431", "0432", "0434", "0436", "0437", "0445", "0451", "0456", "0458", "0460", "0462", "0469", "0557" });
            iTakeEge.GenerateReportsForAreas();
            //iTakeEge.SolveAndSaveGrade5AndPrimaryMark();
            //rsur.GeoLoosers();
            Console.WriteLine("All done!");
        }

        //static void CreatePhysicsReports(CokoContext context)
        //{
        //    string folderPath = @"D:\Work\participsCompetences";

        //    var entities = context.ParticipsCompetences.GroupBy(ks => ks.SchoolId);

        //    foreach (var competences in entities)
        //    {
        //        if(!Directory.Exists($@"{folderPath}\{competences.Key}"))
        //        {
        //            Directory.CreateDirectory($@"{folderPath}\{competences.Key}");
        //        }

        //        using (var excelTemplate = new XLWorkbook($@"{folderPath}\template.xlsx"))
        //        {
        //            using (IXLWorksheet sheet = excelTemplate.Worksheets.First())
        //            {
        //                int i = 0;
        //                foreach (var competence in competences)
        //                {
        //                    sheet.Cell(i + 3, 1).Value = competence.Code;
        //                    sheet.Cell(i + 3, 2).Value = competence.FIO;
        //                    sheet.Cell(i + 3, 3).Value = competence.PrimaryMark;
        //                    sheet.Cell(i + 3, 4).Value = getCompetenceString(competence.CompetenceLevel);

        //                    int j = 0;
        //                    foreach (var mark in competence.Marks.Split(';'))
        //                    {
        //                        sheet.Cell(i + 3, j + 5).Value = mark;

        //                        j++;
        //                    }

        //                    i ++;
        //                }
        //            }

        //            excelTemplate.SaveAs($@"{folderPath}\{competences.Key}\{competences.Key}_201700.xlsx");
        //        }
        //    }
        //}

        static string getCompetenceString(int level)
        {
            switch (level)
            {
                case 2:
                    return "Недостаточный";
                case 3:
                    return "Минимальный";
                case 4:
                    return "Базовый";
                case 5:
                    return "Выше базового";
                default:
                    throw new ArgumentException("неверный параметр level");
            }
        }

        //private static void CreateSchoolReportInExcel(IGrouping<string, OneTwoThreeReportDto> schoolReport)
        //{
        //    var schoolId = schoolReport.Key;
        //    var currentPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\OneTwoThreeReports\{schoolId}";
        //    if (!Directory.Exists(currentPath))
        //        Directory.CreateDirectory(currentPath);

        //    var currentFilePath = currentPath + $@"\{schoolId}_201683";

        //    var excelTemplate = new XLWorkbook(Directory.GetCurrentDirectory() + @"\\201677_ППР.xlsx");
        //    var sheet = excelTemplate.Worksheets.First();

        //    var school = _schools.GetAll().Single(s => s.Id == schoolId);
        //    sheet.Cell(2, 1).Value = $"{school.Name.Trim()} ({school.Area.Name.Trim()})";

        //    int i = 0;
        //    foreach (var result in schoolReport)
        //    {
        //        sheet.Cell(4 + i, 2).Value = result.ExerciseMarkId;
        //        sheet.Cell(4 + i, 3).Value = result.Surname;
        //        sheet.Cell(4 + i, 4).Value = result.Name;
        //        sheet.Cell(4 + i, 5).Value = result.SecondName;
        //        sheet.Cell(4 + i, 6).Value = result.ClassName;
        //        sheet.Cell(4 + i, 7).Value = result.SubjectName;
        //        sheet.Cell(4 + i, 8).Value = result.Marks;
        //        sheet.Cell(4 + i, 9).Value = result.GradeStr;
        //        i++;
        //    }

        //    excelTemplate.SaveAs(currentFilePath + ".xlsx");

        //    using (ZipFile zip = new ZipFile())
        //    {
        //        zip.AddFile(currentFilePath + ".xlsx", "");
        //        zip.Save(currentFilePath + ".zip");
        //    }

        //    System.IO.File.Delete(currentFilePath + ".xlsx");
        //}

        //private static List<IGrouping<string, OneTwoThreeReportDto>> GetAllResults()
        //{
        //    return new List<IGrouping<string, OneTwoThreeReportDto>>();
            //var res = _context.TestResults.Join(_context.ExerciseMarks, ok => ok.ExerciseMarkId, ik => ik.Id, (testRes, exer) => new
            //{
            //    ParticipId = exer.ParticipId,
            //    ExerciseMarkId = exer.Id,
            //    SubjectName = exer.TestId.ToString(),
            //    Marks = exer.Marks,
            //    GradeStr = testRes.Grade5.ToString()
            //}).Join(_context.Particips, ok => ok.ParticipId, ik => ik.Id, (temp, particip) => new OneTwoThreeReportDto
            //{
            //    SchoolId = particip.SchoolId,
            //    ExerciseMarkId = temp.ExerciseMarkId,
            //    Surname = particip.Surname,
            //    Name = particip.Name,
            //    SecondName = particip.SecondName,
            //    ClassName = particip.ClassCode,
            //    SubjectName = temp.SubjectName,
            //    Marks = temp.Marks,
            //    GradeStr = temp.GradeStr
            //}).OrderBy(o => o.SchoolId).ThenBy(o => o.ClassName).ThenBy(o => o.Surname).ThenBy(o => o.Name).ThenBy(o => o.SecondName).ThenBy(o => o.SubjectName).ToList();

            //for (int i = 0; i < res.Count; i++)
            //{
            //    res[i].ClassName = GetClassName(res[i].ClassName);
            //    res[i].SubjectName = OneTwoThreeTestsKeeper.GetSubjectName(res[i].SubjectName.ToUpper());
            //    res[i].GradeStr = _gradeConverter.ConvertToString(Convert.ToInt32(res[i].GradeStr));
            //}

            //var groupedReports = res.GroupBy(s => s.SchoolId).ToList();
            //return groupedReports;
        //}   
        
        //private static string GetClassName(string classCode)
        //{
            //foreach(var cl in _classes)
            //{
            //    if (cl.Id == classCode)
            //        return cl.Name;
            //}
            //throw new ArgumentException();
            //return null;
        //}
    }
}
