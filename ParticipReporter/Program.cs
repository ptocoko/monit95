using Monit95App.Domain.Core;
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
        static string reportFolder;
        static void Main(string[] args)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            GetReport(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));
            sw.Stop();
            Console.WriteLine(sw.Elapsed.Seconds + " секунд");
            sw.Reset();
            Console.ReadKey();
        }

        static void GetReport(Guid testId, DateTime testDate)
        {
            ITestResultService testResultService = new TestResultService(new cokoContext());
            var results = testResultService.SelectParticipsGroupResults(testId, testDate);
            reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $"//participResults//{results.First().First().ParticipTest.ProjectTest.Test.Name}");
            if (!Directory.Exists(reportFolder))
                Directory.CreateDirectory(reportFolder);

            foreach (var result in results)
            {
                BuildReport(result);
            }
            
        }

        static void BuildReport(IGrouping<string, TestResult> participResults)
        {
            string fullName = participResults.First().ParticipTest.ProjectParticip.Surname + " " + participResults.First().ParticipTest.ProjectParticip.Name;
            string htmlHeader = Helper.GetHeader(fullName);
            string htmlFooter = Helper.GetFooter();

            StringBuilder sb = new StringBuilder();
            sb.Append(Helper.GetTableHeader());
            
            foreach(var result in participResults.OrderBy(p => p.ParticipTest.ProjectTest.TestNumber))
            {
                sb.Append(Helper.GetResultRow(result.ParticipTest.ProjectTest.TestDate, result.PrimaryMark, result.Grade5, result.Marks));
            }
            sb.Append("</table>");
            string htmlBody = sb.ToString();

            
            using (StreamWriter sw = new StreamWriter(reportFolder + $@"\{participResults.Key}.html", false))
            {
                sw.Write(htmlHeader);
                sw.Write(htmlBody);
                sw.Write(htmlFooter);
            }
        }
    }
}
