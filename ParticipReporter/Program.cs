using Monit95App.Domain.Core;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    class Program
    {
        static string _reportFolder;
        static Stopwatch _sw;
        static string _blockName;
        static List<DescriptionDto> _partsDesc;
        static List<DescriptionDto> _elementsDesc;
        static DateTime _testDate;

        static void Main(string[] args)
        {
            _sw = new Stopwatch();
            _sw.Start();
            GetReport(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));
            _sw.Stop();
            Console.WriteLine($"{_sw.Elapsed.Milliseconds} миллисекунд");
            _sw.Reset();

            Console.ReadKey();
        }

        static void GetReport(Guid testId, DateTime testDate)
        {
            ITestResultService testResultService = new TestResultService(new cokoContext());
            
            var results = testResultService.SelectParticipsGroupResults(testId, testDate);
            
            SetInstances(results);

            _reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $"//participResults//{results.BlockName}");
            if (!Directory.Exists(_reportFolder))
                Directory.CreateDirectory(_reportFolder);

            //foreach (var result in results)
            //{
            //     BuildReport(result);
            //}

            BuildReport(results.ParticipReports.First());
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
            string resultTable = HtmlBuilder.GetTable(reportDto.Results);
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
