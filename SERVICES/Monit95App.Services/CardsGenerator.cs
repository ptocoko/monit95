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

namespace Monit95App.Services
{
    public class CardsGenerator
    {
        private readonly string _cardsFolderPath = @"C:\\cards";
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
                //return GenerateCardsForSchool(schoolId, projectTestId);

                //throw new NotImplementedException();

                throw new ArgumentException();
            }
        }

        public string GenerateCardsForSchool(string schoolId, int projectTestId)
        {
            var maxMarks = new string[] { "4", "1", "3", "1", "1" };
            var zipFolder = $@"{_cardsFolderPath}\{projectTestId}";
            var zipPath = $@"{zipFolder}\{schoolId}.zip";
            CreateFolder(zipFolder);

            Parallel.ForEach(GetFirstClassReportDtos(schoolId, projectTestId), reportDto =>
            {
                var pdfBytes = reporter.GetClassParticipReportBytes(reportDto, maxMarks, "20 сентября 2018 г.");

                var participCardFolder = $@"{_cardsFolderPath}\{projectTestId}\{schoolId}\{reportDto.ClassName}";
                CreateFolder(participCardFolder);

                var participCardPath = $@"{participCardFolder}\{reportDto.SchoolParticipInfo.Surname} {reportDto.SchoolParticipInfo.Name} {reportDto.SchoolParticipInfo.SecondName}.pdf";
                using (FileStream fs = new FileStream(participCardPath, FileMode.Create))
                {
                    fs.Write(pdfBytes, 0, pdfBytes.Length);
                }
            });

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
                    MarksString = pt.Result.Marks
                })
                .ToList();

            entities.ForEach(dto =>
            {
                dto.Marks = dto.MarksString.Split(';');
                dto.ClassName = dto.ClassName.Replace(" ", "");
                dto.SchoolParticipInfo.Surname = NormalizeName(dto.SchoolParticipInfo.Surname);
                dto.SchoolParticipInfo.Name = NormalizeName(dto.SchoolParticipInfo.Name);

                if (dto.SchoolParticipInfo.SecondName != null)
                    dto.SchoolParticipInfo.SecondName = NormalizeName(dto.SchoolParticipInfo.SecondName);
            });

            return entities;
        }

        private string NormalizeName(string name)
        {
            return Regex.Replace(name, @"\W", "");
        }
    }
}
