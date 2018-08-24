using Ionic.Zip;
using Monit95App.Infrastructure.Data;
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
        public string[] BadSchoolsIds { get; set; } = new string[] { "0015", "0025", "0028", "0068", "0141", "0160", "0208", "0235", "0241", "0242", "0299", "0307", "0311", "0319", "0323", "0330", "0339", "0352", "0358", "0363", "0364", "0370", "0380", "0381", "0389", "0395", "0398", "0411", "0413", "0419", "0427", "0431", "0437", "0445", "0451", "0456" };

        public void GenerateCards()
        {
            var context = new CokoContext();
            foreach (var schoolid in BadSchoolsIds)
            {
                var schoolInfo = context.Schools.Where(s => s.Id == schoolid).Select(s => new { SchoolName = s.Name.Trim(), AreaName = s.Area.Name.Trim() }).Single();
                string schoolIdDirPath = $@"D:\Work\reports\1-3 (новое)\{schoolInfo.AreaName}\{schoolInfo.SchoolName}";
                CreateDirectories(schoolIdDirPath);

                var reportDtos = context.ParticipTests.Where(pt => pt.ProjectTest.ProjectId == 14 && pt.Particip.SchoolId == schoolid && pt.Grade5 > 0 && new int[] { 2033, 2034, 2035 }.Contains(pt.ProjectTestId))
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
                            DoneGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(gb => gb.Select(s => s.AwardedMark).Sum()).Count(p => p != 0),
                            AllGeneralTasks = pt.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number).Count(),
                            AdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.AwardedMark),
                            MaxAdditionalTasksPoints = pt.OneTwoThreeQuestionMarks.Where(p => !p.OneTwoThreeQuestion.IsGeneralPart).Sum(s => s.OneTwoThreeQuestion.MaxMark),
                            GradeStr = pt.GradeString,
                            Grade5 = pt.Grade5.Value,
                            FirstClassGrade5 = pt.Particip.FirstClassGrades?.FirstClassGrade5,
                            FirstClassGradeStr = pt.Particip.FirstClassGrades?.FirstClassGradeStr
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
                    var htmlBuilder = new HtmlBuilder(reportDto);
                    var reportHtml = htmlBuilder.GetReport();

                    var pdfGenerator = new NReco.PdfGenerator.HtmlToPdfConverter();
                    pdfGenerator.Margins.Top = 5;
                    pdfGenerator.Margins.Bottom = 5;
                    var pdfBytes = pdfGenerator.GeneratePdf(reportHtml);
                    using (FileStream fs = new FileStream($@"{schoolIdDirPath}\{reportDto.HeadingDto.ClassName.Substring(0, 1)} класс\{reportDto.HeadingDto.TestName}\{reportDto.HeadingDto.ClassName}-{reportDto.HeadingDto.Fio}.pdf", FileMode.Create))
                    {
                        fs.Write(pdfBytes, 0, pdfBytes.Length);
                    }
                });

                //using (ZipFile zip = new ZipFile())
                //{
                //    zip.AlternateEncoding = Encoding.UTF8;
                //    zip.AlternateEncodingUsage = ZipOption.Always;

                //    zip.AddDirectory(schoolIdDirPath);

                //    using (FileStream fs = new FileStream(schoolIdDirPath + $"\\{schoolid}_201817.zip", FileMode.Create))
                //    {
                //        zip.Save(fs);
                //    }

                //    foreach (var dirToDel in Directory.EnumerateDirectories(schoolIdDirPath))
                //    {
                //        Directory.Delete(dirToDel, true);
                //    }
                //}

                Console.WriteLine("ended for " + schoolid);
            }
        }

        private void CreateDirectories(string dirPath)
        {
            foreach (var subject in new string[] { "Математика", "Русский язык", "Чтение" })
            {
                foreach (var className in new string[] { "1 класс" }) //, "2 класс", "3 класс" })
                {
                    if (!Directory.Exists(dirPath + $@"\{className}\{subject}"))
                        Directory.CreateDirectory(dirPath + $@"\{className}\{subject}");
                }
            }
        }
    }
}
