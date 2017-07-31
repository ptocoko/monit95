using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipEditService : IRsurParticipEditService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<ProjectParticipEdit> _participEditRepository;
        private readonly IGenericRepository<ProjectParticip> _participRepository;

        public RsurParticipEditService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipEdit> participEditRepository, IGenericRepository<ProjectParticip> participRepository)
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
                var entity = new ProjectParticipEdit
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
                _unitOfWork.DbContext.ProjectParticipEdits.Remove(entity);
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