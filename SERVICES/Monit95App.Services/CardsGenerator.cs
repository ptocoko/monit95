using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Monit95App.Services.DTOs;
using Monit95App.Infrastructure.Data;
using Ionic.Zip;
using System.Text.RegularExpressions;
using System.Data.Entity.SqlServer;

namespace Monit95App.Services
{
    public class CardsGenerator
    {
        private readonly string _cardsFolderPath = @"\\192.168.88.254\inetpub\wwwroot\monit95\file\1_classes\092021\cards";
        private readonly CokoContext context;
        private readonly ClassParticipReporter reporter;

        public CardsGenerator(CokoContext context, ClassParticipReporter reporter)
        {
            this.context = context;
            this.reporter = reporter;
        }

        public string GetCardsArchievePath(string schoolId, int projectTestId)
        {
            var cardArchievePath = $@"{_cardsFolderPath}\{projectTestId}\{schoolId}.zip";
            if (System.IO.File.Exists(cardArchievePath))
            {
                return cardArchievePath;
            }
            else
            {
                return GenerateCardsForSchool(schoolId, projectTestId);

                //throw new NotImplementedException();

                //throw new ArgumentException();
            }
        }

        public string GenerateCardsForSchool(string schoolId, int projectTestId)
        {
            var maxMarks = new string[] { "4", "1", "3", "1", "1" };
            var zipFolder = $@"{_cardsFolderPath}\{projectTestId}";
            var zipPath = $@"{zipFolder}\{schoolId}.zip";
            CreateFolder(zipFolder);

            if (System.IO.File.Exists(zipPath))
            {
                return zipPath;
            }

            Parallel.ForEach(GetFirstClassReportDtos(schoolId, projectTestId), reportDto =>
            {
                var pdfBytes = reporter.GetClassParticipReportBytes(reportDto, maxMarks);

                var participCardFolder = $@"{_cardsFolderPath}\{projectTestId}\{schoolId}\{reportDto.ClassName}";
                CreateFolder(participCardFolder);

                var participCardPath = $@"{participCardFolder}\{reportDto.SchoolParticipInfo.Surname} {reportDto.SchoolParticipInfo.Name} {reportDto.SchoolParticipInfo.SecondName}.pdf";
                using (FileStream fs = new FileStream(participCardPath, FileMode.Create))
                {
                    fs.Write(pdfBytes, 0, pdfBytes.Length);
                }
            });

            if (Directory.Exists(zipFolder + "\\" + schoolId))
            {
                using (FileStream fs = new FileStream(zipPath, FileMode.Create))
                {
                    using (ZipFile zip = new ZipFile())
                    {
                        zip.AlternateEncoding = Encoding.UTF8;
                        zip.AlternateEncodingUsage = ZipOption.Always;

                        zip.AddDirectory(zipFolder + "\\" + schoolId);
                        zip.Save(fs);
                    }
                }
            }

            Directory.Delete($@"{zipFolder}\{schoolId}", true);

            return zipPath;
        }

        private static void CreateFolder(string folderPath)
        {
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);
        }

        private IEnumerable<FirstClassReportDto> GetFirstClassReportDtos(string schoolId, int projectTestId)
        {
            var entities = context.ParticipTests
                .AsNoTracking()
                //.Include("Particip.School")
                //.Include("Particip.Class")
                //.Include("Result")
                //.AsEnumerable()
                .Where(pt => pt.ProjectTestId == projectTestId && pt.Particip.SchoolId == schoolId && pt.Grade5 > 0)
                .Select(pt => new FirstClassReportDto
                {
                    SchoolParticipInfo = new Domain.Core.SchoolParticip
                    {
                        Surname = pt.Particip.Surname.Trim(),
                        Name = pt.Particip.Name.Trim(),
                        SecondName = pt.Particip.SecondName.Trim(),
                        SchoolName = pt.Particip.SchoolId + " - " + pt.Particip.School.Name.Trim()
                    },
                    ParticipTestId = pt.Id,
                    ClassName = pt.Particip.Class.Name,
                    PrimaryMark = pt.PrimaryMark,
                    GradeGroup = pt.GradeString,
                    TestDateTime = pt.ProjectTest.TestDate,
                    MarksString = pt.Result.Marks,
                    Grade5 = pt.Grade5.Value
                })
                .ToList();

            entities.ForEach(dto =>
            {
                dto.Marks = dto.MarksString.Split(';');
                dto.ClassName = dto.ClassName.Replace(" ", "");
                dto.SchoolParticipInfo.Surname = NormalizeName(dto.SchoolParticipInfo.Surname);
                dto.SchoolParticipInfo.Name = NormalizeName(dto.SchoolParticipInfo.Name);
                dto.TestDate = dto.TestDateTime.ToString("dd MMMM yyyy г.");
                dto.GradeStrings = GetGradeStrings(dto.Marks);

                if (dto.SchoolParticipInfo.SecondName != null)
                    dto.SchoolParticipInfo.SecondName = NormalizeName(dto.SchoolParticipInfo.SecondName);
            });

            return entities;
        }

        private string NormalizeName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return name;
            }

            string newName = name;
            foreach (var invChar in Path.GetInvalidFileNameChars())
            {
                newName = name.Replace(invChar, '\0');
            }
            return newName;
        }

        private string[] GetGradeStrings(string[] marks)
        {
            var result = new List<string>();
            string getGradeStr(int curr, int minMax, int minMid)
            {
                if (curr >= minMax)
                {
                    return "высокий уровень";
                }
                else if (curr >= minMid)
                {
                    return "средний уровень";
                }
                else
                {
                    return "низкий уровень";
                }
            }

            result.Add(getGradeStr(int.Parse(marks[0]), 14, 7));
            result.Add(getGradeStr(int.Parse(marks[1]), 5, 3));
            result.Add(getGradeStr(int.Parse(marks[2]), 9, 5));
            result.Add(getGradeStr(int.Parse(marks[3]), 16, 15));

            return result.ToArray();
        }
    }
}
