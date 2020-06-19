using Ionic.Zip;
using Monit95App.Infrastructure.Data;
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
    public class OneTwoThree
    {
        public string[] BadSchoolsIds { get; set; } = { "0240", "0411", "0150", "0416", "0237", "0271", "0028", "0263", "0078", "0016", "0382", "0171", "0192", "0068", "0307", "0058", "0409", "0440", "0462", "0141", "0160", "0213", "0026", "0311", "0134", "0223", "0045", "0293", "0348", "0422", "0191", "0067", "0145", "0299", "0152", "0202", "0398", "0427", "0369", "0456", "0553", "0288", "0420", "0435", "0190", "0228", "0395", "0195", "0467", "0347", "0081", "0229", "0204", "0297", "0350", "0328", "0156", "0025", "0269", "0319", "0144", "0555", "0247", "0133", "0019", "0175", "0389", "0070", "0437", "0264", "0419", "0373", "0015", "0043", "0322", "0327", "0241", "0200", "0455", "0421", "0132", "0362", "0062", "0352", "0380", "0385", "0469", "0129", "0436", "0341", "0438", "0558", "0339", "0164", "0219", "0059", "0012" };

        public void GenerateCards()
        {
            var context = new CokoContext();
            var schoolIds = context.ParticipTests.Where(pt => pt.ProjectTest.ProjectId == 31).Select(pt => pt.Particip.SchoolId).Distinct();
            var projectTests = context.ProjectTests.Where(pj => pj.ProjectId == 31)
                .Select(pj => new { pj.Id, pj.ClassNumber, pj.Test.Name }).Distinct();

            foreach (var schoolid in schoolIds)
            {
                foreach (var projectTest in projectTests)
                {
                    // var schoolInfo = context.Schools.Where(s => s.Id == schoolid).Select(s => new { SchoolName = s.Name.Trim(), AreaName = s.Area.Name.Trim() }).Single();
                    //string schoolIdDirPath = $@"D:\Work\reports\1-3 (новое)\{schoolInfo.AreaName}\{schoolInfo.SchoolName}";
                    string destFolder = $@"\\192.168.88.223\файлы_пто\Работы\[2016-77] - 1-3 классы\2020\карты";
                    //string destFolder = $@"D:\Work\карты";
                    string schoolIdDirPath = $@"{destFolder}\{schoolid}";
                    // CreateDirectories(schoolIdDirPath);

                    var reportDtos = context.ParticipTests.Where(pt => pt.ProjectTestId == projectTest.Id && pt.Particip.SchoolId == schoolid && pt.Grade5.HasValue && pt.Grade5 > 0)
                        .Include("Particip.School.Area")
                        .Include("OneTwoThreeQuestionMarks.OneTwoThreeQuestion")
                        .Include("ProjectTest.Test")
                        .ToList()
                        .Select(pt => new ReportDto
                        {
                            HeadingDto = new HeadingDto
                            {
                                Fio = pt.Particip.Surname.Trim() + " " + pt.Particip.Name.Trim() + " " + pt.Particip.SecondName?.Trim(),
                                ClassName = pt.Particip.Class.Name.Trim(),
                                SchoolName = pt.Particip.School.Name.Trim(),
                                AreaName = pt.Particip.School.Area.Name.Trim(),
                                TestName = pt.ProjectTest.Test.Name.Trim(),
                            //TestDate = pt.ProjectTest.TestDate.Day + " " + SqlFunctions.DateName("month", pt.ProjectTest.TestDate).ToLower() + " " + pt.ProjectTest.TestDate.Year
                            TestDate = pt.ProjectTest.TestDate.ToString("dd MMMM yyyy г.")
                            },
                            OverviewDto = new OverviewDto
                            {
                                DoneGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(gb => gb.Select(s => s.AwardedMark).Sum()).Count(p => p != 0),
                                AllGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Count(),
                                AdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.AwardedMark),
                                MaxAdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.OneTwoThreeQuestion.MaxMark),
                                GradeStr = pt.GradeString,
                                Grade5 = pt.Grade5.Value,
                            //FirstClassGrade5 = pt.Particip.FirstClassGrades?.FirstClassGrade5,
                            //FirstClassGradeStr = pt.Particip.FirstClassGrades?.FirstClassGradeStr
                        },
                            QuestionsDto = pt.OneTwoThreeQuestionMarks.OrderBy(ob => ob.OneTwoThreeQuestion.Number).ThenBy(tb => tb.OneTwoThreeQuestion.Name).Select(qm => new QuestionsDto
                            {
                                Name = qm.OneTwoThreeQuestion.Name,
                                ElementName = qm.OneTwoThreeQuestion.ElementNames,
                                Grade100 = (qm.AwardedMark * 100) / qm.OneTwoThreeQuestion.MaxMark
                            })
                        });

                    Parallel.ForEach(reportDtos, reportDto =>
                    {
                        var htmlBuilder = new HtmlBuilder(reportDto, new OneTwoThreeBuilder());
                        var reportHtml = htmlBuilder.GetReport();

                        var pdfGenerator = new NReco.PdfGenerator.HtmlToPdfConverter();
                        pdfGenerator.Margins.Top = 5;
                        pdfGenerator.Margins.Bottom = 5;
                        var pdfBytes = pdfGenerator.GeneratePdf(reportHtml);
                        CreateDirectory($@"{schoolIdDirPath}\{reportDto.HeadingDto.ClassName.Substring(0, 1)}\{reportDto.HeadingDto.TestName.Substring(0, 2).ToLower()}\{reportDto.HeadingDto.ClassName}");
                        using (FileStream fs = new FileStream($@"{schoolIdDirPath}\{reportDto.HeadingDto.ClassName.Substring(0, 1)}\{reportDto.HeadingDto.TestName.Substring(0, 2).ToLower()}\{reportDto.HeadingDto.ClassName}\{reportDto.HeadingDto.Fio}.pdf", FileMode.Create))
                        {
                            fs.Write(pdfBytes, 0, pdfBytes.Length);
                        }
                    });

                    using (var zip = new ZipFile(Encoding.UTF8))
                    {
                        zip.AddDirectory($@"{schoolIdDirPath}\{projectTest.ClassNumber}\{projectTest.Name.Substring(0, 2).ToLower()}");
                        zip.Save($@"{schoolIdDirPath}\{projectTest.ClassNumber}\{projectTest.Name.Substring(0, 2).ToLower()}.zip");
                    }

                    Directory.Delete($@"{schoolIdDirPath}\{projectTest.ClassNumber}\{projectTest.Name.Substring(0, 2).ToLower()}", true);

                    //foreach (var dirToDel in Directory.EnumerateDirectories(schoolIdDirPath))
                    //{
                    //    Directory.Delete(dirToDel, true);
                    //}
                    //Directory.Delete(schoolIdDirPath, true);


                    Console.WriteLine("ended for " + schoolid);
                }

            }
        }

        private void CreateDirectory(string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }

        private void CreateDirectories(string dirPath)
        {
            foreach (var subject in new [] { "Математика", "Русский язык", "Чтение" })
            {
                foreach (var className in new [] { "1 класс", "2 класс", "3 класс" })
                {
                    if (!Directory.Exists(dirPath + $@"\{className}\{subject}"))
                        Directory.CreateDirectory(dirPath + $@"\{className}\{subject}");
                }
            }
        }
    }
}
