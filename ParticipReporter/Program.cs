﻿using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using Monit95App.Services.Work.Concrete;
using SelectPdf;
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
        
        static string _blockName;
        static List<DescriptionDto> _partsDesc;
        static List<DescriptionDto> _elementsDesc;
        static DateTime _testDate;
        static IUnitOfWork _unitOfWork;

        static void Main(string[] args)
        {
            _unitOfWork = new UnitOfWorkV2(new cokoContext());
            
            Console.WriteLine("Start");
            GetReports(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));
            ConvertReportsToPdf();
            Console.WriteLine("End");
            Console.ReadKey();
        }

        static void GetReports(Guid testId, DateTime testDate)
        {
            ITestResultService testResultService = new TestResultService(new Repository<TestElement>(_unitOfWork), new Repository<TestResult>(_unitOfWork));

            var results = testResultService.SelectParticipsGroupResults(testId, testDate);

            SetInstances(results);

            _reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\participResults\{results.BlockName}");
            if (!Directory.Exists(_reportFolder))
                Directory.CreateDirectory(_reportFolder);

            foreach (var result in results.ParticipReports)
            {
                BuildReport(result);
            }
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

        static void ConvertReportsToPdf()
        {
            var reportsHtml = Directory.GetFiles(_reportFolder);
            HtmlToPdf converter = new HtmlToPdf();
         //   PdfDocument doc = null;
            int i = 0;
            foreach (var report in reportsHtml)
            {

                Console.WriteLine("Begin Read File");
                var read = File.ReadAllText(report);

                Console.WriteLine("Begin Convert file");
                var co = converter.ConvertHtmlString(read);                

                Console.WriteLine("Begin Save file");
                co.Save(_reportFolder + @"\pdfs\" + report.Split(new char[] { '\\' }).Last().Split(new char[] { '.' })[0] + ".pdf");
                //doc.Save;
                Console.WriteLine(i++);
            }
            //doc.Close();
        }

        static void ConvertInStream(string fileName)
        {
            
        }
    }
}
