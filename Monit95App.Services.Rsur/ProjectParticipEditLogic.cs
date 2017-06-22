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
    public class ProjectParticipEditLogic : IProjectParticipEditLogic
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<ProjectParticipsEdit> _projectParticipEditRepository;

        public ProjectParticipEditLogic(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsEdit> projectParticipEditRepository)
        {
            this._unitOfWork = unitOfWork;
            this._projectParticipEditRepository = projectParticipEditRepository;
        }

        public List<ProjectParticipEditModel> GetModels()
        {
            var entities =  _projectParticipEditRepository.GetAll().ToList();

            var models = new List<ProjectParticipEditModel>();
            foreach (var entity in entities)
            {
                ProjectParticipEditModel model = new ProjectParticipEditModel()
                {
                    ParticipCode = entity.ParticipCode,
                    ParticipSurname = entity.Surname,
                    ParticipSecondName = entity.SecondName
                };

                models.Add(model);
            }

            return models;
        }

        public void AddModel(ProjectParticipEditModel model)
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

                _projectParticipEditRepository.Insert(entity);
                _unitOfWork.Save();
            }
        }
    }
}