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
        //private readonly string destFolderPath = @"C:\repositories\4";

        public ResultsImporter(CokoContext context)
        {
            this.context = context;
        }

        public void ImportAndSave(TestOptions options, int repositoryId)
        {
            var destFolderPath = context.Repositories.Find(repositoryId).Path;
            foreach(var fileName in Directory.EnumerateFiles(destFolderPath).Select(Path.GetFileNameWithoutExtension).Where(p => p.StartsWith(options.Code)))
            {
                var schoolId = fileName.Substring(5, 4);
                
                var models = ImportModels(options, schoolId, destFolderPath);

                SaveModels(models, options.MaxMarks);
            }
        }

        public IEnumerable<ResultDto> ImportModels(TestOptions options, string schoolId, string destFolderPath)
        {
            using (var excel = new XLWorkbook($@"{destFolderPath}\{options.Code}_{schoolId}.xlsx"))
            {
                var page = excel.Worksheets.First();
                
                return ImportModelsFromExcel(page, schoolId, options);
            }
        }

        private IEnumerable<ResultDto> ImportModelsFromExcel(IXLWorksheet sheet, string schoolId, TestOptions options)
        {
            var dtoList = new List<ResultDto>();
            //IXLRow row;
            //ResultDto resultDto;
            //string val;
            for(int i = 3; i <= sheet.RowsUsed().Count(); i++)
            {
                var row = sheet.Row(i);
                if (CheckSheetsRow(row))
                {
                    var resultDto = new ResultDto
                    {
                        Surname = row.Cell(2).Value.ToString().Trim(),
                        Name = row.Cell(3).Value.ToString().Trim(),
                        SecondName = row.Cell(4).Value.ToString().Trim(),
                        TestCode = options.Code,
                        SchoolId = schoolId,
                        Years = options.Years,
                        MarksArray = row.Cells("6:" + (options.MarksCount + 5)).Select(s => 
                        {
                            var val = s.Value.ToString().Trim();
                            if (string.IsNullOrEmpty(val) || val.Any(v => !char.IsNumber(v)))
                            {
                                return 0;
                            }
                            else
                            {
                                return int.Parse(val);
                            }
                        }).ToArray(),
                        OptionNumber = short.Parse(row.Cell(5).Value.ToString())
                    };

                    resultDto.Marks = resultDto.MarksArray.Select(m => m.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
                    resultDto.PrimaryMark = resultDto.MarksArray.Sum();

                    if (resultDto.PrimaryMark < options.MinMidMark)
                    {
                        resultDto.Grade5 = 3;
                        resultDto.GradeString = "Низкий уровень";
                    }
                    else if (resultDto.PrimaryMark <= options.MaxMidMark)
                    {
                        resultDto.Grade5 = 4;
                        resultDto.GradeString = "Средний уровень";
                    }
                    else
                    {
                        resultDto.Grade5 = 5;
                        resultDto.GradeString = "Высокий уровень";
                    }

                    dtoList.Add(resultDto);
                }
            }
            return dtoList;
        }

        private void SaveModels(IEnumerable<ResultDto> results, int[] maxMarks)
        {
            //TwoThreeResult resultEntity;
            //int mark;
            //TwoThreeResultsMarks questionMarkEntity;
            foreach (var result in results)
            {
                var resultEntity = new TwoThreeResult
                {
                    Surname = FixName(result.Surname),
                    Name = FixName(result.Name),
                    SecondName = FixName(result.SecondName),
                    PrimaryMark = result.PrimaryMark,
                    Marks = result.Marks,
                    GradeString = result.GradeString,
                    Grade5 = result.Grade5,
                    Years = result.Years,
                    OptionNumber = result.OptionNumber,
                    TestCode = result.TestCode,
                    SchoolId = result.SchoolId
                };

                context.TwoThreeResults.Add(resultEntity);
                context.SaveChanges();

                for (int i = 0; i < result.MarksArray.Length; i++)
                {
                    var mark = result.MarksArray[i];
                    var questionMarkEntity = new TwoThreeResultsMarks
                    {
                        AwardedMark = mark,
                        MaxMark = maxMarks[i],
                        QuestionOrder = i + 1,
                        ResultId = resultEntity.Id
                    };

                    context.TwoThreeResultsMarks.Add(questionMarkEntity);
                }
                context.SaveChanges();
            }
        }

        private bool CheckSheetsRow(IXLRow row)
        {
            if (row.Cells("2:12").Any(c => c.HasFormula))
            {
                return false;
            }
            
            var optionValue = row.Cell(5).Value.ToString();

            if(row.Cells("2:3").Any(c => string.IsNullOrEmpty(c.Value.ToString().Trim()) || c.Value.ToString() == "0" || c.Value.ToString().Any(let => char.IsNumber(let))))
            {
                return false;
            }

            if (optionValue.Length != 1 || !char.IsNumber(optionValue[0]))
            {
                return false;
            }

            return true;
        }

        private string FixName(string name)
        {
            name = name.Replace("\t", "");
            if (name.Length > 49)
            {
                name = name.Substring(0, 49);
            }

            return name;
        }
    }
}
