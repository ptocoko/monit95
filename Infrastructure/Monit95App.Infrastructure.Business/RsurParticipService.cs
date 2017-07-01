using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipService : IRsurParticipService
    {
        #region Fields

        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;

        #endregion

        #region Methods

        public RsurParticipService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticip> rsurParticipRepository)
        {
            _unitOfWork = unitOfWork;
            _rsurParticipRepository = rsurParticipRepository;
        }

        public void Add(RsurParticipModel model)
        {
            //newPParticip.School = _db.Schools.Find(newPParticip.SchoolId);            

            //var areaPParticips = _db.ProjectParticips.Where(x => x.School.AreaCode == newPParticip.School.AreaCode).ToList();                                              
            //var areaParticipCodes = areaPParticips.Select(x => Int32.Parse(x.ParticipCode.Substring(9, 3)));
            //var validCodes = Enumerable.Range(1, 2000).Except(areaParticipCodes);            
            //var firstValidCode = validCodes.OrderBy(x => x).First().ToString();

            //if (firstValidCode.Length == 1) firstValidCode = "00" + firstValidCode;
            //if (firstValidCode.Length == 2) firstValidCode = "0" + firstValidCode;

            //string newParticipCode = $"2016-{newPParticip.School.AreaCode.ToString()}-{firstValidCode}";

            //return newParticipCode;
        }

        public bool Update(RsurParticipModel model)
        {
            var entity = _rsurParticipRepository.GetAll().Where(x => x.ParticipCode == model.ParticipCode).Single();

            entity.Surname = model.Surname;
            entity.Name = model.Name;
            entity.SecondName = model.SecondName;
            entity.Birthday = model.Birthday?.AddDays(1);
            entity.ClassNumbers = model.ClassNumbers;          

            _unitOfWork.Save();

            return true;
        }

        #endregion
    }
}
