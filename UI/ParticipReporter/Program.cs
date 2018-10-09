﻿using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.TwoThree;
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
        private static CardsGenerator cardsGenerator;
        private static ClassParticipReporter participReporter;
        private static ResultsImporter importer;

        static void Main(string[] args)
        {
            //oneTwoThree = new OneTwoThree();
            context = new CokoContext();
            importer = new ResultsImporter(context);

            importer.ImportAndSave("0303", 9);

            //CopyFiles();

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

        static void NormalizeParticipNames()
        {
            var particips = context.Particips.Where(p => p.ProjectId == 17);

            foreach (var particip in particips)
            {
                particip.Surname = NormalizeName(particip.Surname);
                particip.Name = NormalizeName(particip.Name);
                particip.SecondName = particip.SecondName == null ? null : NormalizeName(particip.SecondName);
            }
            context.SaveChanges();
        }

        static string NormalizeName(string name)
        {
            return name.Replace('\t', '\0').Replace('\n', '\0').Replace('\r', '\0').Replace(' ', '\0');
        }

        static void GenerateFirstClassCards()
        {
            var schoolIds = context.ParticipTests.Where(pt => pt.ProjectTestId == 2043 && pt.Grade5 > 0).Select(pt => pt.Particip.SchoolId).Distinct();
            foreach (var schoolId in schoolIds)
            {
                Console.WriteLine($"Started for {schoolId}");
                cardsGenerator.GetCardsArchievePath(schoolId, 2043);
                Console.WriteLine($"Ended for {schoolId}");
            }
            Console.WriteLine("Ended");
        }

        static void CopyFiles()
        {
            string destFolder = $@"\\192.168.88.220\файлы_пто\Работы\[2016-61] - рсур\Диагностика «Октябрь-2018»\распределения";
            string sourceFolder = $@"\\192.168.88.220\файлы_пто\Работы\[2016-61] - рсур\Диагностика «Октябрь-2018»\распределения";
            //string reportCode = "201692";

            foreach (var areaCode in context.Areas.Where(p => p.Code != 1000).Select(s => s.Code))
            {
                //var school = context.Schools.Find(schoolId);
                var destFile = $@"{destFolder}\{areaCode}";
                var sourceFile = $@"{sourceFolder}\102018_ру_распределение_{areaCode}.xlsx";

                if (System.IO.File.Exists(sourceFile))
                {
                    if (!Directory.Exists(destFile))
                        Directory.CreateDirectory(destFile);

                    System.IO.File.Copy(sourceFile, $@"{destFile}\102018_ру_распределение_{areaCode}.xlsx");
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
