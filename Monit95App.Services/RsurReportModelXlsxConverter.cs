using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using ClosedXML.Excel;
using Monit95App.Services.Models.Rsur;
using Monit95App.Services.Interfaces.Rsur;
using System.Resources;
using System.Reflection;

namespace Monit95App.Services
{    
    public class RsurReportModelXlsxConverter : IRsurReportModelConverter
    {
        private readonly IGenericRepository<ProjectParticip> _projectParticipRepository;
        private string tempalteFilePath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\particips-template.xlsx";

        public RsurReportModelXlsxConverter()
        {

        }

        public RsurReportModelXlsxConverter(IGenericRepository<ProjectParticip> projectParticipRepository)
        {
            _projectParticipRepository = projectParticipRepository;
        }

        public RsurReportModel Create(int? areaCode = null, string schoolId = null)
        {
            //var assembly = Assembly.GetExecutingAssembly();
            //var resourceName = "txt.txt";

            //using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            //using (StreamReader reader = new StreamReader(stream))
            //{
            //    string result = reader.ReadToEnd();
            //}

            var query = _projectParticipRepository.GetAll();
            if (areaCode != null)
                query = query.Where(x => x.School.AreaCode == areaCode);
            if (schoolId != null)
                query = query.Where(x => x.SchoolId == schoolId);

            var projectParticips = new List<ProjectParticip>();
            projectParticips = query.ToList();            

            var rsurReportModel = new RsurReportModel()
            {
                ReportCreatedDate = DateTime.Now,
                ReportName = "Список участников РСУР"
            };

            rsurReportModel.RsurParticipFullInfos = projectParticips.Select(x => new RsurParticipFullInfo(x)).ToList();

            return rsurReportModel;
        }

        public Stream Write(RsurReportModel rsurReportModel)
        {            
            if (rsurReportModel == null) throw new ArgumentNullException("rsurReportModel", "RsurReportModelXlsxConverter.Write");
            
            var templateBook = new XLWorkbook(tempalteFilePath);
            var templateSheet = templateBook.Worksheets.First();
            templateSheet.Cell("C1").Value = rsurReportModel.ReportCreatedDate;
            templateSheet.Cell("C2").Value = rsurReportModel.ReportName;

            int rowNumber = 5;
            foreach (var info in rsurReportModel.RsurParticipFullInfos)
            {
                templateSheet.Cell(rowNumber, 2).Value = info.ParticipCode;
                templateSheet.Cell(rowNumber, 3).Value = info.Surname;
                templateSheet.Cell(rowNumber, 4).Value = info.Name;
                templateSheet.Cell(rowNumber, 5).Value = info.SecondName;
                templateSheet.Cell(rowNumber, 6).Value = info.AreaName;
                templateSheet.Cell(rowNumber, 7).Value = info.SchoolIdWithName;
                templateSheet.Cell(rowNumber, 8).Value = info.SubjectName;
                templateSheet.Cell(rowNumber, 9).Value = info.CategName;
                templateSheet.Cell(rowNumber, 10).Value = info.Experience;
                templateSheet.Cell(rowNumber, 11).Value = info.Phone;
                templateSheet.Cell(rowNumber, 12).Value = info.Email;
                templateSheet.Cell(rowNumber, 13).Value = info.Birthday?.ToShortDateString();
                templateSheet.Cell(rowNumber, 14).Value = info.ClassNumbers;

                rowNumber++;
            }

            var memoryStream = new MemoryStream();

            templateBook.SaveAs(memoryStream);
            memoryStream.Position = 0;
            return memoryStream;
        }

        public Task<Stream> GetStream(int? areaCode, string schoolId = null)
        {
            return Task.Run(() =>
            {
                var model = Create(areaCode, schoolId);
                var stream = Write(model);

                return stream;
            });            
        }
    }
}
