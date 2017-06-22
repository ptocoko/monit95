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
        private IGenericRepository<ProjectParticipsEdit> _projectParticipToEditRepository;

        public ProjectParticipEditLogic(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsEdit> projectParticipToEditRepository)
        {
            this._unitOfWork = unitOfWork;
            this._projectParticipToEditRepository = projectParticipToEditRepository;
        }

        public List<ProjectParticipEditModel> GetModels()
        {
            var entities =  _projectParticipToEditRepository.GetAll().ToList();

            var models = new List<ProjectParticipEditModel>();
            foreach (var entity in entities)
            {
                ProjectParticipEditModel model = new ProjectParticipEditModel()
                {
                    ParticipCode = entity.ParticipCode,
                    Surname = entity.Surname,
                    SecondName = entity.SecondName
                };

                models.Add(model);
            }

            return models;
        }
    }
}
