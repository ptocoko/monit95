using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipService : IRsurParticipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;

        public RsurParticipService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticip> rsurParticipRepository)
        {
            _unitOfWork = unitOfWork;
            _rsurParticipRepository = rsurParticipRepository;
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
    }
}
