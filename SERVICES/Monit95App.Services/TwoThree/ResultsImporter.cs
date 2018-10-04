using ClosedXML.Excel;
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

        public void ImportByTestCode(string testCode)
        {
            IEnumerable<ResultDto> dto;
            foreach(var fileName in Directory.EnumerateFiles(destFolderPath).Select(Path.GetFileNameWithoutExtension).Where(p => p.StartsWith(testCode)))
            {
                var schoolId = fileName.Substring(4, 4);
                dto = ImportByFilePath($@"{destFolderPath}\{fileName}.xlsx", testCode, schoolId);
            }
        }

        public IEnumerable<ResultDto> ImportByFilePath(string filePath, string testCode, string schoolId)
        {
            using (var excel = new XLWorkbook(filePath))
            {
                using (var page = excel.Worksheets.First())
                {
                    return ImportForCht(page, testCode, schoolId);
                }
            }
            throw new NotImplementedException();
        }

        private IEnumerable<ResultDto> ImportForCht(IXLWorksheet sheet, string testCode, string schoolId)
        {
            int marksCount = 9;
            var dtoList = new List<ResultDto>();
            for(int i = 3; i <= sheet.RowsUsed().Count(); i++)
            {
                var row = sheet.Row(i);
                if(CheckSheetsRow(row, marksCount + 3))
                {
                    var resultDto = new ResultDto
                    {
                        Surname = row.Cell(2).Value.ToString().Trim(),
                        Name = row.Cell(3).Value.ToString().Trim(),
                        SecondName = row.Cell(4).Value.ToString().Trim(),
                        SchoolId = schoolId,
                        Marks = row.Cells("5:13").Select(s => s.Value.ToString()).Aggregate((s1, s2) => $"{s1};{s2}")
                    };
                    resultDto.PrimaryMark = resultDto.Marks.Split(';').Select(int.Parse).Sum();
                    resultDto.TestCode = testCode;

                    dtoList.Add(resultDto);
                }
            }
            //var marks = 
            //return new ResultDto
            //{
            //    PrimaryMark = sheet
            //}

            throw new NotImplementedException();
        }

        private bool CheckSheetsRow(IXLRow row, int columnsCount)
        {
            for(int i = 2; i<=columnsCount; i++)
            {
                if (String.IsNullOrEmpty(row.Cell(i).Value.ToString().Trim()))
                {
                    return false;
                }
            }
            return true;
        }
    }
}
