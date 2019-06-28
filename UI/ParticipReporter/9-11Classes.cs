using Monit95App.Infrastructure.Data;
using Monit95App.Services.ItakeEge.Report;
using ParticipReporter.Builders;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public class _9_11Classes
    {
        private readonly CokoContext context;
        private readonly ReportService reportService;

        public _9_11Classes(CokoContext context, ReportService reportService)
        {
            this.context = context;
            this.reportService = reportService;
        }

        public string[] BadSchoolsIds { get; set; } = new string[] { "0352", "0240", "0438", "0164", "0435", "0152", "0420", "0416", "0382", "0409", "0362", "0223", "0160", "0369", "0427", "0347", "0553", "0558", "0555", "0380", "0421", "0195", "0204", "0293", "0175", "0395", "0191", "0237", "0398", "0171", "0145", "0247", "0437", "0389", "0350", "0228", "0229", "0150", "0213", "0269", "0297", "0440", "0436", "0422", "0373", "0411", "0133", "0067", "0016", "0134", "0068", "0462", "0070", "0045", "0467", "0043", "0129", "0019", "0469", "0132", "0081", "0012", "0059", "0015", "0263", "0141", "0058", "0271", "0299", "0419", "0341", "0311", "0322", "0192", "0219", "0348", "0156", "0264", "0144", "0241", "0385", "0455", "0025", "0062", "0078", "0456", "0026", "0028", "0202", "0307", "0319", "0327", "0190", "0288", "0200", "0339", "0328" };

        public void GenerateCards()
        {
            foreach (var schoolid in BadSchoolsIds)
            {
                var schoolInfo = context.Schools.Where(s => s.Id == schoolid).Select(s => new { SchoolName = s.Name.Trim(), AreaName = s.Area.Name.Trim() }).Single();
                string schoolIdDirPath = $@"\\192.168.88.223\файлы_пто\Работы\[23] - Диагностика в 9 и 11 классах\Карты\042019\{schoolInfo.AreaName}\{schoolInfo.SchoolName}";
                CreateDirectories(schoolIdDirPath);

                var reportDtos = context.ParticipTests
                    .Where(pt => pt.ProjectTest.ProjectId == 26 && pt.Particip.SchoolId == schoolid && pt.Grade5.HasValue && pt.Grade5 > 0)
                    .AsEnumerable()
                    .Select(pt =>
                    {
                        var participReport = reportService.GetReport(pt.Id).Result;

                        return new ReportDto
                        {
                            HeadingDto = new HeadingDto
                            {
                                Fio = $"{ participReport.Surname } {participReport.Name } { participReport.SecondName }",
                                SchoolName = participReport.SchoolName,
                                ClassName = participReport.ClassName,
                                TestDate = participReport.TestDateString
                            },
                            OverviewDto = new OverviewDto
                            {
                                TestName = participReport.TestName,
                                PrimaryMark = participReport.PrimaryMark,
                                Grade5 = participReport.Grade5,
                                GradeStr = participReport.TestStatus
                            },
                            QuestionsDto = participReport.ElementsResults.Select(er => new QuestionsDto
                            {
                                Name = er.ElementNumber,
                                ElementName = er.Name,
                                Grade100 = (int)er.Value.Value
                            })
                        };
                    });

                foreach(var reportDto in reportDtos)
                {
                    var htmlBuilder = new HtmlBuilder(reportDto, new _9_11Builder());
                    var reportHtml = htmlBuilder.GetReport();

                    var pdfGenerator = new NReco.PdfGenerator.HtmlToPdfConverter();
                    pdfGenerator.Margins.Top = 5;
                    pdfGenerator.Margins.Bottom = 5;
                    var pdfBytes = pdfGenerator.GeneratePdf(reportHtml);
                    using (FileStream fs = new FileStream($@"{schoolIdDirPath}\{reportDto.HeadingDto.ClassName} класс\{reportDto.OverviewDto.TestName.Split(',')[0]}\{reportDto.HeadingDto.ClassName}-{reportDto.HeadingDto.Fio}.pdf", FileMode.Create))
                    {
                        fs.Write(pdfBytes, 0, pdfBytes.Length);
                    }
                }

                Console.WriteLine("ended for " + schoolid);
            }
        }

        private void CreateDirectories(string dirPath)
        {
            foreach (var subject in new string[] { "География", "Обществознание", "Физика" })
            {
                foreach (var className in new string[] { "11 класс", "9 класс" }) //, "2 класс", "3 класс" })
                {
                    if (!Directory.Exists(dirPath + $@"\{className}\{subject}"))
                        Directory.CreateDirectory(dirPath + $@"\{className}\{subject}");
                }
            }
        }
    }
}
