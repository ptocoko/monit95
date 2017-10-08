using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur
{
    using DocumentFormat.OpenXml.Drawing;

    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.Interfaces;

    public class RsurTestService : IRsurTestService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public RsurTestService(CokoContext context)
        {
            this.context = context;
        }

        #region Services

        public RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null)
        {
            var particips = this.context.RsurParticipTests.Where(x => x.RsurTestId == rsurTestId);

            if (areaCode != null)
            {
                particips = particips.Where(x => x.RsurParticip.School.AreaCode == areaCode);
            }

            var countParticips = particips.Count();
            if (countParticips == 0)
            {
                throw new ArgumentException(nameof(rsurTestId));
            }

            double countParticipsWithResults = particips.Count(x => x.RsurTest != null);
            var result = Math.Round(countParticipsWithResults / countParticips * 100, 0);

            return new RsurTestStatisticsDto { ProtocolStatus = (int)result };
        }

        #endregion
    }
}

//public IEnumerable<ParticipMarksDto> GetParticipMarksDtos(int projectTestId, string schoolId)
//{
//if (schoolId == null)
//{
//throw new ArgumentNullException(nameof(schoolId));
//}

//var dtos = from participTest in _participTestRepository.GetAll()
//where participTest.ProjectTestId == projectTestId && participTest.Particip.SchoolId == schoolId
//join particip in _participRepository.GetAll() on participTest.ParticipId equals particip.Id
//join a in _resultRepository.GetAll() on participTest.Id equals a.ParticipTestId
//into b
//from result in b.DefaultIfEmpty()
//select new ParticipMarksDto
//{
//ParticipTestId = participTest.Id,
//Surname = particip.Surname,
//Name = particip.Name,
//SecondName = particip.SecondName,
//ClassName = particip.Class.Name,
//Marks = result == null ? null : result.Marks
//};

//return dtos.ToList();
//}