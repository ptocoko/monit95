using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipEditService : IRsurParticipEditService
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<ProjectParticipsEdit> _participEditRepository;
        private IGenericRepository<ProjectParticip> _participRepository;

        public RsurParticipEditService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsEdit> participEditRepository, IGenericRepository<ProjectParticip> participRepository)
        {
            this._unitOfWork = unitOfWork;
            this._participEditRepository = participEditRepository;
            _participRepository = participRepository;
        }

        public List<RsurParticipEditModel> GetModels()
        {
            var models = _participEditRepository.GetAll().Join(_participRepository.GetAll(), ik => ik.ParticipCode, ok => ok.ParticipCode, (ik, ok) => new RsurParticipEditModel
            {
                ParticipCode = ik.ParticipCode,
                NewParticipSurname = ik.Surname,
                OldParticipSurname = ok.Surname,
                NewParticipName = ik.Name,
                OldParticipName = ok.Name,
                NewParticipSecondName = ik.SecondName,
                OldParticipSecondName = ok.SecondName
            }).ToList();

            return models;
        }

        public bool AddModel(RsurParticipEditModel model)
        {
            try
            {
                var entity = new ProjectParticipsEdit
                {
                    ParticipCode = model.ParticipCode,
                    Surname = model.NewParticipSurname,
                    Name = model.NewParticipName,
                    SecondName = model.NewParticipSecondName
                };

                _participEditRepository.Insert(entity);
                _unitOfWork.Save();
            }
            catch (RetryLimitExceededException)
            {
                return false;
            }
            return true;
        }

        public bool DeleteModel(string participCode)
        {
            try
            {
                var entity = _participEditRepository.GetAll().Single(p => p.ParticipCode == participCode);
                _unitOfWork.DbContext.ProjectParticipsEdits.Remove(entity);
                _unitOfWork.Save();
            }
            catch (RetryLimitExceededException)
            {
                return false;
            }
            return true;
        }
    }
}