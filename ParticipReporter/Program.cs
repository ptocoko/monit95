using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ParticipReporter
{
    class Program
    {
        static string _reportFolder;
        
        static string _blockName;
        static List<DescriptionDto> _partsDesc;
        static List<DescriptionDto> _elementsDesc;
        static DateTime _testDate;        

        static void Main(string[] args)
        {
            Console.WriteLine("Process");

            CokoContext context = new CokoContext();
            ParticipResults resultsService = new ParticipResults(new GenericRepository<Result>(context));
            ClassParticipReporter reporter = new ClassParticipReporter();
            string[] schoolIds = new string[] { "0005" };
            foreach (var schoolId in schoolIds)
            {
                var schoolParticipIds = context.ParticipTests.Where(p => p.ProjectTestId == 1011 && p.Particip.SchoolId == schoolId).Select(s => s.Id).ToArray();
                var classParticipDtos = resultsService.GetListClassParticipReportDto(schoolParticipIds);

                //string htmlText;
                byte[] pdfBytes;
                string reportFolderPath = $"D:/Work/{schoolId}/";
                if (!Directory.Exists(reportFolderPath))
                    Directory.CreateDirectory(reportFolderPath);

                foreach (var classParticip in classParticipDtos.Skip(1).Take(1))
                {
                    pdfBytes = reporter.GetClassParticipReportBytes(classParticip, new string[] { "4", "1", "3", "1", "1" }, "26 сентября 2017 г.");
                    using (FileStream fs = new FileStream(reportFolderPath + $"{classParticip.ClassName.Replace(" ", "")}-{classParticip.Surnane}-{classParticip.Name}.pdf", FileMode.Create))
                    {
                        fs.Write(pdfBytes, 0, pdfBytes.Length);
                    }

                    //htmlText = reporter.GetReportHtml(classParticip, new string[] { "4", "1", "3", "1", "1" }, "26 сентября 2017 г.");
                    //using (StreamWriter sw = new StreamWriter(reportFolderPath + $"{classParticip.Fio}.html"))
                    //{
                    //    sw.Write(htmlText);
                    //}
                }
            }
            //var htmlText = (new SchoolParticipReporter()).GetReportHtml(classParticip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

            //var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(htmlText);

            //using (StreamWriter sw = new StreamWriter(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + $@"/{classParticip.Fio}.html"))
            //{
            //    sw.Write(htmlText);
            //}

            //GetReports(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));

            //var htmlProcessor = new HtmlProcessor(_reportFolder);
            //htmlProcessor.Process();

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

        private static void SetInstances(ReportsDto results)
        {
            _blockName = results.BlockName;
            _partsDesc = results.PartsDescription;
            _elementsDesc = results.ElementsDescription;
            _testDate = results.TestDate;
        }

        static void BuildReport(ParticipReportDto reportDto)
        {
            string htmlHeader = HtmlBuilder.GetHeader(reportDto.ParticipCode, _blockName, _testDate);
            string resultTable = HtmlBuilder.GetTable(reportDto.Results, _partsDesc, _elementsDesc);
            string htmlFooter = HtmlBuilder.GetFooter();

            using (StreamWriter sw = new StreamWriter(_reportFolder + $@"\{reportDto.ParticipCode}.html", false))
            {
                sw.Write(htmlHeader);
                sw.Write(resultTable);
                sw.Write(htmlFooter);
            }
        }          
    }
}
