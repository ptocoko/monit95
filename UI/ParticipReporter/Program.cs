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
        static void Main(string[] args)
        {
            var context = new CokoContext();
            foreach (var schoolid in new string[] { "0005" })
            {
                var schoolInfo = context.Schools.Where(s => s.Id == schoolid).Select(s => new { SchoolName = s.Name.Trim(), AreaName = s.Area.Name.Trim() }).Single();
                CreateDirectories($@"D:\Work\reports\{schoolInfo.AreaName}\{schoolInfo.SchoolName}");

                var reportDtos = context.ParticipTests.Where(pt => pt.ProjectTest.ProjectId == 14 && pt.Particip.SchoolId == schoolid && pt.Grade5 > 0)
                    .Include("Particip.School.Area")
                    .Include("OneTwoThreeQuestionMarks.OneTwoThreeQuestion")
                    .Include("ProjectTest.Test")
                    .ToList()
                    .Select(pt => new ReportDto
                    {
                        HeadingDto = new HeadingDto
                        {
                            Fio = pt.Particip.Surname + " " + pt.Particip.Name + " " + pt.Particip.SecondName,
                            ClassName = pt.Particip.Class.Name.Trim(),
                            SchoolName = pt.Particip.School.Name.Trim(),
                            AreaName = pt.Particip.School.Area.Name.Trim(),
                            TestName = pt.ProjectTest.Test.Name.Trim(),
                            //TestDate = pt.ProjectTest.TestDate.Day + " " + SqlFunctions.DateName("month", pt.ProjectTest.TestDate).ToLower() + " " + pt.ProjectTest.TestDate.Year
                            TestDate = pt.ProjectTest.TestDate.ToString("dd MMMM yyyy г.")
                        },
                        OverviewDto = new OverviewDto
                        {
                            DoneGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p=>p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(gb => gb.Select(s => s.AwardedMark).Sum()).Count(p => p != 0),
                            AllGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Count(),
                            AdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.AwardedMark),
                            MaxAdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.OneTwoThreeQuestion.MaxMark),
                            GradeStr = pt.GradeString,
                            Grade5 = pt.Grade5.Value
                        },
                        QuestionsDto = pt.OneTwoThreeQuestionMarks.OrderBy(ob => ob.OneTwoThreeQuestion.Number).ThenBy(tb => tb.OneTwoThreeQuestion.Name).Select(qm => new QuestionsDto
                        {
                            Name = qm.OneTwoThreeQuestion.Name,
                            ElementName = qm.OneTwoThreeQuestion.ElementNames,
                            Grade100 = (qm.AwardedMark * 100) / qm.OneTwoThreeQuestion.MaxMark
                        })
                    });

                
                //var parallelOptions = new ParallelOptions();
                //parallelOptions.TaskScheduler = TaskScheduler.
                Parallel.ForEach(reportDtos, reportDto =>
                {
                    //if (!Directory.Exists(\{reportDto.HeadingDto.ClassName.Substring(0, 1)}\{reportDto.HeadingDto.TestName}"))
                    //{
                    //    Directory.CreateDirectory($@"D:\Work\reports\{reportDto.HeadingDto.AreaName}\{reportDto.HeadingDto.SchoolName}\{reportDto.HeadingDto.Fio}");
                    //}
                    ////костыль чтобы папка успела создаться прежде чем она будет использована
                    //Thread.Sleep(500);

                    var htmlBuilder = new HtmlBuilder(reportDto);
                    var reportHtml = htmlBuilder.GetReport();

                    var pdfGenerator = new NReco.PdfGenerator.HtmlToPdfConverter();
                    pdfGenerator.Margins.Top = 5;
                    pdfGenerator.Margins.Bottom = 5;
                    var pdfBytes = pdfGenerator.GeneratePdf(reportHtml);
                    using (FileStream fs = new FileStream($@"D:\Work\reports\{reportDto.HeadingDto.AreaName}\{reportDto.HeadingDto.SchoolName}\{reportDto.HeadingDto.ClassName.Substring(0,1)} класс\{reportDto.HeadingDto.TestName}\{reportDto.HeadingDto.Fio}.pdf", FileMode.Create))
                    {
                        fs.Write(pdfBytes, 0, pdfBytes.Length);
                    }
                });
            }

            //foreach (var reportDto in reportDtos)
            //{

            //}

            //var htmlBuilder = new HtmlBuilder(reportDtos.Single());
            //var reportHtml = htmlBuilder.GetReport();
            //var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(reportHtml);
            //using (FileStream fs = new FileStream(@"D:\Work\reports\example.pdf", FileMode.Create))
            //{
            //    fs.Write(pdfBytes, 0, pdfBytes.Length);
            //}
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
            ////var htmlText = (new SchoolParticipReporter()).GetReportHtml(classParticip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

            ////var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(htmlText);

            ////using (StreamWriter sw = new StreamWriter(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + $@"/{classParticip.Fio}.html"))
            ////{
            ////    sw.Write(htmlText);
            ////}

            ////GetReports(new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"), new DateTime(2017, 04, 20));

            ////var htmlProcessor = new HtmlProcessor(_reportFolder);
            ////htmlProcessor.Process();
            #endregion
        }

        static void CreateDirectories(string dirPath)
        {
            foreach (var subject in new string[] { "Математика", "Русский язык", "Чтение" })
            {
                foreach (var className in new string[] { "1 класс", "2 класс", "3 класс" })
                {
                    if(!Directory.Exists(dirPath + $@"\{className}\{subject}"))
                        Directory.CreateDirectory(dirPath + $@"\{className}\{subject}");
                }
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
