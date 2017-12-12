﻿using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace OneTwoThreeReporter
{
    class Program
    {        
        static IGenericRepository<Result> _testResults;
        static IGenericRepository<School> _schools;
        static List<Class> _classes;
        static IGrade5 _gradeConverter;
        static CokoContext _context;

        static void Main(string[] args)
        {
            _context = new CokoContext();            
            _testResults = new GenericRepository<Result>(_context);
            _schools = new GenericRepository<School>(_context);
            _gradeConverter = new OneTwoThreeGradeConverter();

            var classService = new ClassService(new GenericRepository<Class>(_context));
            _classes = classService.GetAll().ToList();
            
            var reports = GetAllResults();
            foreach (var report in reports)
            {
                CreateSchoolReportInExcel(report);
            }
            
            Console.WriteLine("All Ok!");
            Console.ReadKey();
        }      

        private static List<IGrouping<string, OneTwoThreeReportDto>> GetAllResults()
        {
            return new List<IGrouping<string, OneTwoThreeReportDto>>();
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
        }        

        private static void CreateSchoolReportInExcel(IGrouping<string, OneTwoThreeReportDto> schoolReport)
        {
            var schoolId = schoolReport.Key;
            var currentPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\OneTwoThreeReports\{schoolId}";
            if (!Directory.Exists(currentPath))
                Directory.CreateDirectory(currentPath);

            var currentFilePath = currentPath + $@"\{schoolId}_201683";

            var excelTemplate = new XLWorkbook(Directory.GetCurrentDirectory() + @"\\201677_ППР.xlsx");
            var sheet = excelTemplate.Worksheets.First();

            var school = _schools.GetAll().Single(s => s.Id == schoolId);
            sheet.Cell(2, 1).Value = $"{school.Name.Trim()} ({school.Area.Name.Trim()})";

            int i=0;
            foreach(var result in schoolReport)
            {
                sheet.Cell(4 + i, 2).Value = result.ExerciseMarkId;
                sheet.Cell(4 + i, 3).Value = result.Surname;
                sheet.Cell(4 + i, 4).Value = result.Name;
                sheet.Cell(4 + i, 5).Value = result.SecondName;
                sheet.Cell(4 + i, 6).Value = result.ClassName;
                sheet.Cell(4 + i, 7).Value = result.SubjectName;
                sheet.Cell(4 + i, 8).Value = result.Marks;
                sheet.Cell(4 + i, 9).Value = result.GradeStr;
                i++;
            }
            
            excelTemplate.SaveAs(currentFilePath + ".xlsx");

            using(ZipFile zip = new ZipFile())
            {
                zip.AddFile(currentFilePath + ".xlsx", "");
                zip.Save(currentFilePath + ".zip");
            }

            System.IO.File.Delete(currentFilePath + ".xlsx");
        }

        private static string GetClassName(string classCode)
        {
            foreach(var cl in _classes)
            {
                if (cl.Id == classCode)
                    return cl.Name;
            }
            throw new ArgumentException();
        }
    }
}