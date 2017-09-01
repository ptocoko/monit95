using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipEditService : IRsurParticipEditService
    {
        #region Dependencies

        private readonly IGenericRepository<RsurParticip> _rsurParticipRepository;
        private readonly IGenericRepository<RsurParticipEdit> _rsurParticipEditRepository;        

        #endregion

        public RsurParticipEditService(IGenericRepository<RsurParticip> rsurParticipRepository,
                                       IGenericRepository<RsurParticipEdit> rsurParticipEditRepository)
        {
            _rsurParticipRepository = rsurParticipRepository;
            _rsurParticipEditRepository = rsurParticipEditRepository;            
        }

        #region Services

        public IEnumerable<RsurParticipEditModel> GetAll()
        {
           

            return new List<RsurParticipEditModel>();
        }

        public bool AddModel(RsurParticipEditModel model)
        {
            try
            {
                var entity = new RsurParticipEdit
                {
                    ParticipCode = model.ParticipCode,
                    Surname = model.NewParticipSurname,
                    Name = model.NewParticipName,
                    SecondName = model.NewParticipSecondName
                };

                _rsurParticipEditRepository.Insert(entity);                
            }
            catch (RetryLimitExceededException)
            {
                return false;
            }
            return true;
        }

        public void Apply(string participCode) //apply and delete edit
        {
          

            _rsurParticipEditRepository.Delete(participCode);
        }

        #endregion
    }
}