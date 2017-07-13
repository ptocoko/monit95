using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
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

        public RsurReportModel Create(int? areaCode, string schoolId)
        {
            var projectParticips = _projectParticipRepository.GetAll();
            if(areaCode != null)
            {
                projectParticips = projectParticips.Where(x => x.School.AreaCode == areaCode);
            }

            //IQueryable<ProjectParticip> projectParticips = null;
            //if (userName.Equals("coko"))
            //    projectParticips = _projectParticipRepository.GetAll();
            //if (userName.Length == 3)
            //{
            //    projectParticips = projectParticips.Where(x => x.School.AreaCode == Convert.ToInt32(userName));
            //}

            return new RsurReportModel();
        }

        #endregion

    }
}
