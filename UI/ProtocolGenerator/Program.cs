using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.ItakeEge.Report;
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
            //var reporter = new ReportService(context);
            //var iTakeEge = new ITakeEge(
            //    context: context,
            //    projectId: 33);

            var firstClass = new FirstClass(context);
            firstClass.GenerateExcelProtocol(@"\\192.168.88.254\inetpub\wwwroot\monit95\file\1_classes\092021\protocols\template.xlsx", @"\\192.168.88.254\inetpub\wwwroot\monit95\file\1_classes\092021\protocols", 3123);

            //iTakeEge.SolveGrade5_v2().Wait();
            //iTakeEge.GenerateForAllSchools(@"D:\Work\ITakeSociety\102019", "template society.xlsx", false);
            //iTakeEge.GenerateReportsForAreas();
            //iTakeEge.GenerateForAllAreas(@"D:\Work\ITakeEge\092019\Areas", "template ege.xlsx", false);
            //iTakeEge.SolveAndSaveGrade5(new int[] { 3051, 3052, 3053, 3054, 3055, 3057 });
            //iTakeEge.SolveAndSaveGrade5(new int[] { 3090 });
            //iTakeEge.SolveGrade5IgnoringQuestions(new int[] { }, 3085, 8, true);
            //iTakeEge.SetPrimaryMark_v2IngoringQuestionIds(new int[] { 2163 }, 3086);

            //var report = reporter.GetReport(758706);

            //var oneTwoThree = new OneTwoThree(context, null, 36);
            //oneTwoThree.GenerateExcelReports();
            // iTakeEge.GenerateRaspr(33, @"D:\Work\ITakeEge2\092020\raspr", "template new ege.xlsx", false);
            //iTakeEge.ResolvePrimaryMark(3090);

            Console.WriteLine("All done!");
            Console.ReadKey();
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
