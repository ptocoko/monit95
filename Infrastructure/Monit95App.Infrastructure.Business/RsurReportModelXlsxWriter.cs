using System;
using System.IO;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using Monit95App.Infrastructure.Business.Models.Rsur;
using ClosedXML.Excel;
using System.Linq;

namespace Monit95App.Infrastructure.Business
{
    #warning будет ли код работать в многопоточной среде?
    public class RsurReportModelXlsxWriter : IRsurReportModelWriter
    {
        #region Fields

        private string tempalteFilePath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\particips-template.xlsx";

        #endregion

        public Stream Write(RsurReportModel rsurReportModel)
        {
            if (rsurReportModel == null) throw new ArgumentNullException("model", "RsurReportModelXlsxWriter.Write");            
            
            var templateBook = new XLWorkbook(tempalteFilePath);                        
            var templateSheet = templateBook.Worksheets.First();            
            templateSheet.Cell("C1").Value = rsurReportModel.ReportCreatedDate;
            templateSheet.Cell("C2").Value = rsurReportModel.ReportName;

            int rowNumber = 5;
            foreach (var info in rsurReportModel.RsurParticipFullInfos)
            {
                templateSheet.Cell(rowNumber, 2).Value = info.ParticipCode;
                templateSheet.Cell(rowNumber, 3).Value = info.Surname;
                templateSheet.Cell(rowNumber, 4).Value = info.SecondName;
                templateSheet.Cell(rowNumber, 5).Value = info.AreaName;
                templateSheet.Cell(rowNumber, 6).Value = info.SchoolIdWithName;
                templateSheet.Cell(rowNumber, 7).Value = info.SubjectName;
                templateSheet.Cell(rowNumber, 8).Value = info.CategName;
                templateSheet.Cell(rowNumber, 9).Value = info.Experience;
                templateSheet.Cell(rowNumber, 10).Value = info.Phone;
                templateSheet.Cell(rowNumber, 11).Value = info.Email;
                templateSheet.Cell(rowNumber, 12).Value = info.Birthday;
                templateSheet.Cell(rowNumber, 13).Value = info.ClassNumbers;                

                rowNumber++;
            }            

            var memoryStream = new MemoryStream();
            
            templateBook.SaveAs(memoryStream);
            memoryStream.Position = 0;
            return memoryStream;                            
        }
    }
}