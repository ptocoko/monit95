using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class FirstClass
    {
        private readonly CokoContext context;

        public FirstClass(CokoContext context)
        {
            this.context = context;
        }

        public void GenerateExcelProtocol(string templatePath, string destDir, int projectTestId)
        {
            var protocols = context.ParticipTests
                .Where(p => p.ProjectTestId == projectTestId && p.Grade5.HasValue && p.Grade5.Value > 0)
                .Select(s => new ProtocolModel
                {
                    Fio = s.Particip.Surname + " " + s.Particip.Name + " " + s.Particip.SecondName,
                    SchoolId = s.Particip.SchoolId,
                    Grade5 = s.Grade5.Value,
                    ParticipTestId = s.Id,
                    Results = s.Result.Marks,
                    GradeStr = s.GradeString,
                    ClassName = s.Particip.Class.Name.Trim(),
                    ClassId = s.Particip.ClassId
                })
                .GroupBy(gb => gb.SchoolId);

            foreach(var schoolProtocols in protocols)
            {
                var subResults = context.FirstClassSubResults
                    .Where(p => p.ParticipTest.Particip.SchoolId == schoolProtocols.Key)
                    .ToList();

                var protocolsByClasses = schoolProtocols.GroupBy(gb => new { gb.ClassId, gb.ClassName });

                if (!Directory.Exists(destDir + @"\" + schoolProtocols.Key))
                {
                    Directory.CreateDirectory(destDir + @"\" + schoolProtocols.Key);
                }

                foreach(var classProtocols in protocolsByClasses)
                {
                    var orderedClassProtocols = classProtocols.OrderBy(ob => ob.Fio);
                    using (var excel = new XLWorkbook(templatePath))
                    {
                        var sheet = excel.Worksheets.First();
                        int i = 5;
                        foreach (var pr in orderedClassProtocols)
                        {
                            var results = pr.Results.Split(';');

                            sheet.Cell(i, 1).Value = i - 4;
                            sheet.Cell(i, 2).Value = pr.Fio;

                            sheet.Cell(i, 3).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 1);
                            sheet.Cell(i, 4).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 2);
                            sheet.Cell(i, 5).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 3);
                            sheet.Cell(i, 6).Value = MinAndMaxSum(subResults, pr.ParticipTestId, true);

                            sheet.Cell(i, 7).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 4);
                            sheet.Cell(i, 8).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 5);
                            sheet.Cell(i, 9).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 6);
                            sheet.Cell(i, 10).Value = MinAndMaxSum(subResults, pr.ParticipTestId, false);

                            sheet.Cell(i, 11).Value = results[0];
                            sheet.Cell(i, 12).Value = GetTaskGradeStr(results[0], 1);


                            sheet.Cell(i, 13).Value = results[1];
                            sheet.Cell(i, 14).Value = GetTaskGradeStr(results[1], 2);


                            sheet.Cell(i, 15).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 7);
                            sheet.Cell(i, 16).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 8);
                            sheet.Cell(i, 17).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 9);
                            sheet.Cell(i, 18).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 10);
                            sheet.Cell(i, 19).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 11);
                            sheet.Cell(i, 20).Value = GetValueFromSubResults(subResults, pr.ParticipTestId, 12);

                            sheet.Cell(i, 21).Value = results[2];
                            sheet.Cell(i, 22).Value = GetTaskGradeStr(results[2], 3);


                            sheet.Cell(i, 23).Value = results[3];
                            sheet.Cell(i, 24).Value = GetTaskGradeStr(results[3], 4);

                            sheet.Cell(i, 25).Value = pr.GradeStr;

                            i++;
                        }
                        excel.SaveAs(destDir + $@"\{schoolProtocols.Key}\{classProtocols.Key.ClassName}.xlsx");
                    }  
                }
            
                using(var zip = new ZipFile())
                {
                    zip.AlternateEncoding = Encoding.UTF8;
                    zip.AlternateEncodingUsage = ZipOption.Always;

                    zip.AddDirectory(destDir + @"\" + schoolProtocols.Key);
                    zip.Save(destDir + @"\" + schoolProtocols.Key + ".zip");
                }

                Directory.Delete(destDir + @"\" + schoolProtocols.Key, true);
            }
        }

        private int GetValueFromSubResults(IList<FirstClassSubResult> subResults, int participTestId, int questionId)
        {
            return subResults.Where(p => p.ParticipTestId == participTestId).Single(p => p.QuestionId == questionId).Value;
        }

        private int MinAndMaxSum(IList<FirstClassSubResult> subResults, int participTestId, bool isFirst)
        {
            if (isFirst)
            {
                var first = GetValueFromSubResults(subResults, participTestId, 1);
                var second = GetValueFromSubResults(subResults, participTestId, 2);
                var third = GetValueFromSubResults(subResults, participTestId, 3);

                return Math.Max(Math.Max(first, second), third) + Math.Min(Math.Min(first, second), third);
            } 
            else
            {
                var first = GetValueFromSubResults(subResults, participTestId, 4);
                var second = GetValueFromSubResults(subResults, participTestId, 5);
                var third = GetValueFromSubResults(subResults, participTestId, 6);

                return Math.Max(Math.Max(first, second), third) + Math.Min(Math.Min(first, second), third);
            }
        }
    
        private string GetTaskGradeStr(string taskGrade, int taskNumber)
        {
            var grade = int.Parse(taskGrade);
            switch (taskNumber)
            {
                case 1:
                    if (grade >= 14)
                    {
                        return "высокий уровень выполнения методики";
                    }
                    else if (grade >= 7)
                    {
                        return "средний уровень выполнения методики";
                    }
                    else
                    {
                        return "низкий уровень выполнения методики";
                    };
                case 2:
                    if (grade >= 5)
                    {
                        return "высокий уровень выполнения методики";
                    }
                    else if (grade >= 3)
                    {
                        return "средний уровень выполнения методики";
                    }
                    else
                    {
                        return "низкий уровень выполнения методики";
                    };
                case 3:
                    if (grade >= 9)
                    {
                        return "высокий уровень выполнения методики";
                    }
                    else if (grade >= 5)
                    {
                        return "средний уровень выполнения методики";
                    }
                    else
                    {
                        return "низкий уровень выполнения методики";
                    };
                case 4:
                    if (grade >= 16)
                    {
                        return "высокий уровень выполнения методики";
                    }
                    else if (grade >= 15)
                    {
                        return "средний уровень выполнения методики";
                    }
                    else
                    {
                        return "низкий уровень выполнения методики";
                    };
                default:
                    return "";
            }
        }
    }

    public class ProtocolModel
    {
        public string Fio { get; set; }
        public string SchoolId { get; set; }
        public int Grade5 { get; set; }
        public int ParticipTestId { get; set; }
        public string Results { get; set; }
        public string GradeStr { get; set; }
        public string ClassId { get; set; }
        public string ClassName { get; set; }
    }
}
