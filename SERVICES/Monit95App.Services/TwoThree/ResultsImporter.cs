using ClosedXML.Excel;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.TwoThree
{
    public class ResultsImporter
    {
        private readonly CokoContext context;
        private readonly string destFolderPath = @"C:\repositories\4";

        public ResultsImporter(CokoContext context)
        {
            this.context = context;
        }

        public void ImportAndSave(string testCode, int marksCount, int[] generalTasksNumbers, int minMidMark, int maxMidMark)
        {
            List<TwoThreeResult> dto = new List<TwoThreeResult>();
            foreach(var fileName in Directory.EnumerateFiles(destFolderPath).Select(Path.GetFileNameWithoutExtension).Where(p => p.StartsWith(testCode)))
            {
                var schoolId = fileName.Substring(5, 4);
                var models = ImportModels(testCode, schoolId, marksCount, generalTasksNumbers, minMidMark, maxMidMark);
                
                dto.AddRange(models);
            }

            context.TwoThreeResults.AddRange(dto);
            context.SaveChanges();
        }

        public IEnumerable<TwoThreeResult> ImportModels(string testCode, string schoolId, int marksCount, int[] generalTasksNumbers, int minMidMark, int maxMidMark)
        {
            using (var excel = new XLWorkbook($@"{destFolderPath}\{testCode}_{schoolId}.xlsx"))
            {
                using (var page = excel.Worksheets.First())
                {
                    return ImportModelsFromExcel(page, testCode, schoolId, marksCount, generalTasksNumbers, minMidMark, maxMidMark);
                }
            }
        }

        private IEnumerable<TwoThreeResult> ImportModelsFromExcel(IXLWorksheet sheet, string testCode, string schoolId, int marksCount, int[] generalTasksNumbers, int minMidMark, int maxMidMark)
        {
            var dtoList = new List<TwoThreeResult>();
            for(int i = 3; i <= sheet.RowsUsed().Count(); i++)
            {
                var row = sheet.Row(i);
                if(CheckSheetsRow(row))
                {
                    var resultDto = new TwoThreeResult
                    {
                        Surname = row.Cell(2).Value.ToString().Trim(),
                        Name = row.Cell(3).Value.ToString().Trim(),
                        SecondName = row.Cell(4).Value.ToString().Trim(),
                        SchoolId = schoolId,
                        Marks = row.Cells("5:" + (marksCount + 4)).Select(s => 
                        {
                            string val = s.Value.ToString().Trim();
                            if (string.IsNullOrEmpty(val) || val.Any(v => !char.IsNumber(v)))
                            {
                                return "0";
                            }
                            else
                            {
                                return val;
                            }
                        }).Aggregate((s1, s2) => $"{s1};{s2}")
                    };

                    var marks = resultDto.Marks.Split(';').Select(int.Parse).ToArray();
                    //List<int> generalMarks = new List<int>();
                    //foreach (var number in generalTasksNumbers)
                    //{
                    //    generalMarks.Add(marks[number - 1] == 0 ? 0 : 1);
                    //}

                    resultDto.PrimaryMark = marks.Sum();
                    //resultDto.GeneralTasksSum = generalMarks.Sum();

                    if(resultDto.PrimaryMark < minMidMark)
                    {
                        resultDto.Grade5 = 3;
                        resultDto.GradeString = "Низкий уровень";
                    }
                    else if (resultDto.PrimaryMark <= maxMidMark)
                    {
                        resultDto.Grade5 = 4;
                        resultDto.GradeString = "Средний уровень";
                    }
                    else
                    {
                        resultDto.Grade5 = 5;
                        resultDto.GradeString = "Высокий уровень";
                    }

                    resultDto.TestCode = testCode;
                    resultDto.Times = 2;

                    dtoList.Add(resultDto);
                }
            }
            return dtoList;
        }

        private bool CheckSheetsRow(IXLRow row)
        {
            if(row.Cells("2:3").Any(c => string.IsNullOrEmpty(c.Value.ToString().Trim()) || c.Value.ToString() == "0" || c.Value.ToString().Any(let => char.IsNumber(let))))
            {
                return false;
            }

            return true;
        }
    }
}
