﻿using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.ItakeEge.Report;
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
        private static Reporter twoThreeReporter;

        static void Main(string[] args)
        {
            context = new CokoContext();
            var participReporter = new ReportService(context);

            var _9_11Classes = new _9_11Classes(context, participReporter);
            _9_11Classes.GenerateCards();

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

        static readonly Dictionary<string, Dictionary<int, int>> maxMakrs = new Dictionary<string, Dictionary<int, int>>
        {
            ["0201"] = new Dictionary<int, int>
            {
                [1] = 2,
                [2] = 2,
                [3] = 2,
                [4] = 1,
                [5] = 3,
                [6] = 1,
                [7] = 1,
                [8] = 1,
                [9] = 2,
                [10] = 2,
                [11] = 1,
                [12] = 1,
                [13] = 2,
                [14] = 1
            },
            ["0202"] = new Dictionary<int, int>
            {
                [1] = 1,
                [2] = 1,
                [3] = 1,
                [4] = 1,
                [5] = 1,
                [6] = 2,
                [7] = 1,
                [8] = 1,
                [9] = 1,
                [10] = 1,
                [11] = 2,
                [12] = 2,
                [13] = 2,
                [14] = 2
            },
            ["0204"] = new Dictionary<int, int>
            {
                [1] = 1,
                [2] = 1,
                [3] = 1,
                [4] = 1,
                [5] = 2,
                [6] = 1,
                [7] = 1,
                [8] = 1
            },
            ["0301"] = new Dictionary<int, int>
            {
                [1] = 1,
                [2] = 1,
                [3] = 1,
                [4] = 1,
                [5] = 1,
                [6] = 1,
                [7] = 1,
                [8] = 1,
                [9] = 2,
                [10] = 2,
                [11] = 2,
                [12] = 2,
                [13] = 3,
                [14] = 1,
                [15] = 2,
                [16] = 3,
                [17] = 1
            },
            ["0302"] = new Dictionary<int, int>
            {
                [1] = 1,
                [2] = 1,
                [3] = 1,
                [4] = 1,
                [5] = 1,
                [6] = 1,
                [7] = 2,
                [8] = 1,
                [9] = 1,
                [10] = 1,
                [11] = 1,
                [12] = 1,
                [13] = 2,
                [14] = 2,
                [15] = 2,
                [16] = 2
            },
            ["0304"] = new Dictionary<int, int>
            {
                [1] = 1,
                [2] = 1,
                [3] = 1,
                [4] = 1,
                [5] = 1,
                [6] = 1,
                [7] = 2
            }
        };

        static void GenerateTwoThreePrimaryMark(string testCode, int minMidMark, int maxMidMark)
        {
            foreach (var entity in context.TwoThreeResults.Where(p => p.TestCode == testCode))
            {
                if(entity.GeneralTasksSum < minMidMark)
                {
                    entity.Grade5 = 3;
                }
                else if (entity.GeneralTasksSum <= maxMidMark)
                {
                    entity.Grade5 = 4;
                }
                else
                {
                    entity.Grade5 = 5;
                }
            }
            context.SaveChanges();
        }

        static void GenerateTwoThreeQuestionMarks()
        {
            var results = new List<TwoThreeResultsMarks>();

            foreach (var result in context.TwoThreeResults.Where(p => p.TestCode != "0303" && p.Times == 2))
            {
                var marks = result.Marks.Split(';').Select(int.Parse).ToArray();

                var questionMarks = new List<TwoThreeResultsMarks>();
                for (int i = 0; i < marks.Count(); i++)
                {
                    var mark = marks[i];
                    var entity = new TwoThreeResultsMarks
                    {
                        ResultId = result.Id,
                        AwardedMark = mark,
                        QuestionOrder = i + 1,
                        MaxMark = maxMakrs[result.TestCode][i + 1]
                    };
                    questionMarks.Add(entity);
                }
                results.AddRange(questionMarks);
            }

            context.TwoThreeResultsMarks.AddRange(results);
            context.SaveChanges();
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
                var sourceFile = $@"{sourceFolder}\102018_ис_распределение_{areaCode}.xlsx";

                if (System.IO.File.Exists(sourceFile))
                {
                    if (!Directory.Exists(destFile))
                        Directory.CreateDirectory(destFile);

                    System.IO.File.Copy(sourceFile, $@"{destFile}\102018_ис_распределение_{areaCode}.xlsx");
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
