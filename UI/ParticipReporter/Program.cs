using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace ParticipReporter
{
    class Program
    {       
        static void Main(string[] args)
        {
            //Console.OutputEncoding = Encoding.UTF8;
            //Console.WriteLine("Процесс");

            //CokoContext context = new CokoContext();
            //ParticipResults resultsService = null; // new ParticipResults(new GenericRepository<Result>(context));
            //ClassParticipReporter reporter = new ClassParticipReporter();
            //string[] schoolIds = new string[] { "0335" };
            //foreach (var schoolId in schoolIds)
            //{
            //    Console.WriteLine("Начата работа для школы " + schoolId);

            //    var schoolParticipIds = context.ParticipTests.Where(p => p.ProjectTestId == 1011 && p.Particip.SchoolId == schoolId).Select(s => s.Id).ToArray();
            //    if (schoolParticipIds == null || schoolParticipIds.Count() == 0)
            //    {
            //        Console.WriteLine("\tУ этой школы нет участников, участвовавших в диагностике\n");
            //        continue;
            //    }

            //    var classParticipDtos = resultsService.GetListClassParticipReportDto(schoolParticipIds);

            //    //string htmlText;
            //    byte[] pdfBytes;
            //    string reportFolderPath = $"D:/Work/карты/{schoolId}/";
            //    if (!Directory.Exists(reportFolderPath))
            //        Directory.CreateDirectory(reportFolderPath);

            //    using (FileStream fs = new FileStream(reportFolderPath + $"{schoolId}_201692.zip", FileMode.Create))
            //    {
            //        using (ZipFile zip = new ZipFile())
            //        {
            //            zip.AlternateEncoding = Encoding.UTF8;
            //            zip.AlternateEncodingUsage = ZipOption.Always;
            //            classParticipDtos.Take(1).AsParallel().ForAll(classParticip =>
            //            {
            //                pdfBytes = reporter.GetClassParticipReportBytes(classParticip, new string[] { "4", "1", "3", "1", "1" }, "26 сентября 2017 года");
            //                zip.AddEntry($"{classParticip.ClassName.Replace(" ", "")}-{classParticip.SchoolParticipInfo.Surname}-{classParticip.SchoolParticipInfo.Name}-{classParticip.SchoolParticipInfo.SecondName}.pdf", pdfBytes);
            //            });
            //            zip.Save(fs);
            //        }
            //    }
            //    Console.WriteLine("\tРабота с этой школой закончена!\n");
            //}
            ////var htmlText = (new SchoolParticipReporter()).GetReportHtml(classParticip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

            ////var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(htmlText);

            ////using (StreamWriter sw = new StreamWriter(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + $@"/{classParticip.Fio}.html"))
            ////{
            ////    sw.Write(htmlText);
            ////}

            ////GetReports(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));

            ////var htmlProcessor = new HtmlProcessor(_reportFolder);
            ////htmlProcessor.Process();

            Console.WriteLine("End");
            Console.ReadKey();
        }

        static void GetReports(Guid testId, DateTime testDate)
        {
            //var context = new CokoContext();
            //var testResultService = new RsurTestResultService(new GenericRepository<Element>(context), new GenericRepository<RsurTestResult>(context));

            //var results = testResultService.SelectParticipsGroupResults(testId, testDate);

            //SetInstances(results);

            //_reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\participResults\{results.BlockName}");
            //if (!Directory.Exists(_reportFolder))
            //    Directory.CreateDirectory(_reportFolder);

            //foreach (var result in results.ParticipReports)
            //{
            //    BuildReport(result);
            //}
        }

        //private static void SetInstances(ReportsDto results)
        //{
        //    _blockName = results.BlockName;
        //    _partsDesc = results.PartsDescription;
        //    _elementsDesc = results.ElementsDescription;
        //    _testDate = results.TestDate;
        //}

        //static void BuildReport(ParticipReportDto reportDto)
        //{
        //    string htmlHeader = HtmlBuilder.GetHeader(reportDto.ParticipCode, _blockName, _testDate);
        //    string resultTable = HtmlBuilder.GetTable(reportDto.Results, _partsDesc, _elementsDesc);
        //    string htmlFooter = HtmlBuilder.GetFooter();

        //    using (StreamWriter sw = new StreamWriter(_reportFolder + $@"\{reportDto.ParticipCode}.html", false))
        //    {
        //        sw.Write(htmlHeader);
        //        sw.Write(resultTable);
        //        sw.Write(htmlFooter);
        //    }
        //}          
    }
}
