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
    public class RsurParticipEditService : IRsurParticipEditService
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<ProjectParticipsEdit> _participEditRepository;

        public RsurParticipEditService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsEdit> participEditRepository)
        {
            this._unitOfWork = unitOfWork;
            this._participEditRepository = participEditRepository;
        }

        public List<RsurParticipEditModel> GetModels()
        {
            var entities = _participEditRepository.GetAll().ToList();

            var models = new List<RsurParticipEditModel>();
            foreach (var entity in entities)
            {
                RsurParticipEditModel model = new RsurParticipEditModel()
                {
                    ParticipCode = entity.ParticipCode,
                    ParticipSurname = entity.Surname,
                    ParticipName = entity.Name,
                    ParticipSecondName = entity.SecondName
                };

                models.Add(model);
            }

            return models;
        }

        public void AddModel(RsurParticipEditModel model)
        {
            if(model != null)
            {
                var entity = new ProjectParticipsEdit
                {
                    ParticipCode = model.ParticipCode,
                    Surname = model.ParticipSurname,
                    Name = model.ParticipName,
                    SecondName = model.ParticipSecondName
                };

                _participEditRepository.Insert(entity);
                _unitOfWork.Save();
            }
        }
    }
}