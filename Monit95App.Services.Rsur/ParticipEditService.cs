using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Rsur.Interfaces;
using Monit95App.Services.Rsur.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur
{
    public class ParticipEditService : IParticipEditService
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<ProjectParticipsEdit> _participEditRepository;

        public ParticipEditService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsEdit> participEditRepository)
        {
            this._unitOfWork = unitOfWork;
            this._participEditRepository = participEditRepository;
        }

        public List<ParticipEditModel> GetModels()
        {
            var entities = _participEditRepository.GetAll().ToList();

            var models = new List<ParticipEditModel>();
            foreach (var entity in entities)
            {
                ParticipEditModel model = new ParticipEditModel()
                {
                    ParticipCode = entity.ParticipCode,
                    ParticipSurname = entity.Surname,
                    ParticipSecondName = entity.SecondName
                };

                models.Add(model);
            }

            return models;
        }

        public void AddModel(ParticipEditModel model)
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