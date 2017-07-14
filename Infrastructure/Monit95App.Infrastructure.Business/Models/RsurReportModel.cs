﻿using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class RsurReportModel
    {
        #region Properties

        public DateTime ReportCreatedDate { get; set; } //dd.mm.yyyy
        public string ReportName { get; set; }        
        public List<RsurParticipFullInfo> Models { get; set; } = new List<RsurParticipFullInfo>();

        #endregion

        public void ExportToXlsx()
        {
            var templateBook = new XLWorkbook(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) 
                                + @"\particips-template.xlsx");
            var templateSheet = templateBook.Worksheets.First();

        }
    }
}

//var schoolId = schoolReport.Key;
//var currentPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\OneTwoThreeReports\{schoolId}";
//            if (!Directory.Exists(currentPath))
//                Directory.CreateDirectory(currentPath);

//            var currentFilePath = currentPath + $@"\{schoolId}_201683";

//var excelTemplate = new XLWorkbook(Directory.GetCurrentDirectory() + @"\\201677_ППР.xlsx");
//var sheet = excelTemplate.Worksheets.First();

//var school = _schools.GetAll().Single(s => s.Id == schoolId);
//sheet.Cell(2, 1).Value = $"{school.Name.Trim()} ({school.Area.Name.Trim()})";

//            int i = 0;
//            foreach(var result in schoolReport)
//            {
//                sheet.Cell(4 + i, 2).Value = result.ExerciseMarkId;
//                sheet.Cell(4 + i, 3).Value = result.Surname;
//                sheet.Cell(4 + i, 4).Value = result.Name;
//                sheet.Cell(4 + i, 5).Value = result.SecondName;
//                sheet.Cell(4 + i, 6).Value = result.ClassName;
//                sheet.Cell(4 + i, 7).Value = result.SubjectName;
//                sheet.Cell(4 + i, 8).Value = result.Marks;
//                sheet.Cell(4 + i, 9).Value = result.GradeStr;
//                i++;
//            }

//            excelTemplate.SaveAs(currentFilePath + ".xlsx");

//            using(ZipFile zip = new ZipFile())
//            {
//                zip.AddFile(currentFilePath + ".xlsx", "");
//                zip.Save(currentFilePath + ".zip");
//            }

//            File.Delete(currentFilePath + ".xlsx");
