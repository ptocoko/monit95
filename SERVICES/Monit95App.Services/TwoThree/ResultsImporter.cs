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

        public void ImportAndSave(string testCode, int marksCount)
        {
            List<TwoThreeResult> dto = new List<TwoThreeResult>();
            foreach(var fileName in Directory.EnumerateFiles(destFolderPath).Select(Path.GetFileNameWithoutExtension).Where(p => p.StartsWith(testCode)))
            {
                var schoolId = fileName.Substring(5, 4);
                var models = ImportModels(testCode, schoolId, marksCount);
                models.ForEach(model =>
                {
                    if(model.PrimaryMark < 5)
                    {
                        model.Grade5 = 2;
                    }
                    else if(model.PrimaryMark < 9)
                    {
                        model.Grade5 = 3;
                    }
                    else if(model.PrimaryMark < 11)
                    {
                        model.Grade5 = 4;
                    }
                    else
                    {
                        model.Grade5 = 5;
                    }
                });
                dto.AddRange(models);
            }

            context.TwoThreeResults.AddRange(dto);
            context.SaveChanges();
        }

        public IEnumerable<TwoThreeResult> ImportModels(string testCode, string schoolId, int marksCount)
        {
            using (var excel = new XLWorkbook($@"{destFolderPath}\{testCode}_{schoolId}.xlsx"))
            {
                using (var page = excel.Worksheets.First())
                {
                    return ImportModelsFromExcel(page, testCode, schoolId, marksCount);
                }
            }
        }

        private IEnumerable<TwoThreeResult> ImportModelsFromExcel(IXLWorksheet sheet, string testCode, string schoolId, int marksCount)
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
                        Marks = row.Cells("5:13").Select(s => 
                        {
                            string val = s.Value.ToString().Trim();
                            if (string.IsNullOrEmpty(val))
                            {
                                return "0";
                            }
                            else
                            {
                                return val;
                            }
                        }).Aggregate((s1, s2) => $"{s1};{s2}")
                    };
                    resultDto.PrimaryMark = resultDto.Marks.Split(';').Select(int.Parse).Sum();
                    resultDto.TestCode = testCode;
                    resultDto.Times = 1;

                    dtoList.Add(resultDto);
                }
            }
            return dtoList;
        }

        private bool CheckSheetsRow(IXLRow row)
        {
            if(row.Cells("2:3").Any(c => string.IsNullOrEmpty(c.Value.ToString().Trim())))
            {
                return false;
            }

            return true;
        }
    }
}
