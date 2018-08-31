using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.SqlServer;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ParticipReporter
{
    class Program
    {
        private static OneTwoThree oneTwoThree;
        private static CokoContext context;

        static void Main(string[] args)
        {
            oneTwoThree = new OneTwoThree();
            //context = new CokoContext();
            oneTwoThree.GenerateCards();
            //GenerateReportEntitiesForSeveralSchools(oneTwoThree.BadSchoolsIds);


            Console.WriteLine("End");
            #region oldCode
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
            //var htmlText = (new SchoolParticipReporter()).GetReportHtml(classParticip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

            //var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(htmlText);

            //using (StreamWriter sw = new StreamWriter(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + $@"/{classParticip.Fio}.html"))
            //{
            //    sw.Write(htmlText);
            //}

            //GetReports(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));

            //var htmlProcessor = new HtmlProcessor(_reportFolder);
            //htmlProcessor.Process();
            #endregion
        }

        static void CopyFiles()
        {
            string destFolder = $@"D:\Work\reports\1-e классы";
            string sourceFolder = $@"\\192.168.88.254\PTO_Cloud Mail.Ru\Reports";
            string reportCode = "201692";

            foreach (var schoolId in oneTwoThree.BadSchoolsIds)
            {
                var school = context.Schools.Find(schoolId);
                var destSchoolFolder = $@"{destFolder}\{school.Area.Name.Trim()}";
                var sourceReportFile = $@"{sourceFolder}\{schoolId}\{schoolId}_{reportCode}.zip";

                if (System.IO.File.Exists(sourceReportFile))
                {
                    if (!Directory.Exists(destSchoolFolder))
                        Directory.CreateDirectory(destSchoolFolder);

                    System.IO.File.Copy(sourceReportFile, $@"{destFolder}\{school.Area.Name.Trim()}\{school.Name.Trim()}.zip");
                }
            }
        } 

        static void GenerateReportEntitiesForSeveralSchools(IEnumerable<string> schoolIds)
        {
            string destFolder = $@"D:\Work\reports\temp";
            string reportCode = "201819";
            string destSchoolFolder = string.Empty;

            foreach (var schoolid in schoolIds)
            {
                destSchoolFolder = $@"{destFolder}\{schoolid}";

                if (!Directory.Exists(destSchoolFolder))
                    Directory.CreateDirectory(destSchoolFolder);

                System.IO.File.Copy($@"{destFolder}\{reportCode}.rar", $@"{destSchoolFolder}\{schoolid}_{reportCode}.rar");
            }
        }

        #region oldCode
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
        #endregion
    }
}
