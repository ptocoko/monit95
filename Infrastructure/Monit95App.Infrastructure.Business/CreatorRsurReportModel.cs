using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class CreatorRsurReportModel : ICreatorRsurReportModel
    {
        #region Fields

        private readonly IGenericRepository<ProjectParticip> _projectParticipRepository;

        #endregion

        #region Methods

        public CreatorRsurReportModel(IGenericRepository<ProjectParticip> projectParticipRepository)
        {
            _projectParticipRepository = projectParticipRepository;
        }
        
        public RsurReportModel Create(int? areaCode = null, string schoolId = null)
        {        
            var query = _projectParticipRepository.GetAll();            
            if (areaCode != null)
                query = query.Where(x => x.School.AreaCode == areaCode);            
            if(schoolId != null)
                query = query.Where(x => x.SchoolId == schoolId);

            var projectParticips = new List<ProjectParticip>();
            try
            {
                projectParticips = query.ToList();
            }
            catch
            {                
                return null;
            }

            var rsurReportModel = new RsurReportModel()
            {
                ReportCreatedDate = DateTime.Now,
                ReportName = "Список участников РСУР"
            };

            rsurReportModel.RsurParticipFullInfos = projectParticips.Select(x => new RsurParticipFullInfo(x)).ToList();

            return rsurReportModel;
        }

        #endregion

    }
}
