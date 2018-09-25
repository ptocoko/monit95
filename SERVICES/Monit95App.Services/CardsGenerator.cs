using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Monit95App.Services.DTOs;
using Monit95App.Infrastructure.Data;

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

        public async Task<string> GetCardsArchievePathAsync(string schoolId, int projectTestId)
        {
            var cardArchievePath = $@"{_cardsFolderPath}\{projectTestId}\{schoolId}.rar";
            if (System.IO.File.Exists(cardArchievePath))
            {
                return cardArchievePath;
            }
            else
            {
                var maxMarks = new string[] { "4", "1", "3", "1", "1" };
                var loopResult = Parallel.ForEach(GetFirstClassReportDtos(schoolId, projectTestId), reportDto =>
                {
                    var pdfBytes = reporter.GetClassParticipReportBytes(reportDto, maxMarks, "20 сентября 2018 г.");

                });
                
                throw new NotImplementedException();
            }
        }



        private IEnumerable<FirstClassReportDto> GetFirstClassReportDtos(string schoolId, int projectTestId)
        {
            return context.ParticipTests
                .AsNoTracking()
                .AsEnumerable()
                .Where(pt => pt.ProjectTestId == projectTestId && pt.Particip.SchoolId == schoolId && pt.Grade5 > 0)
                .Select(pt => new FirstClassReportDto
                {
                    SchoolParticipInfo = new Domain.Core.SchoolParticip
                    {
                        Surname = pt.Particip.Surname,
                        Name = pt.Particip.Name,
                        SecondName = pt.Particip.SecondName,
                        SchoolName = pt.Particip.SchoolId + " - " + pt.Particip.School.Name.Trim()
                    },
                    ParticipTestId = pt.Id,
                    ClassName = pt.Particip.Class.Name.Trim(),
                    PrimaryMark = pt.PrimaryMark,
                    GradeGroup = pt.GradeString,
                    Marks = pt.Result.Marks.Split(';')
                });
        }
    }
}
