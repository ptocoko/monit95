﻿using Monit95App.Domain.Core;
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

            //var models = new List<RsurParticipEditModel>();
            //foreach (var entity in entities)
            //{
            //    RsurParticipEditModel model = new RsurParticipEditModel()
            //    {
            //        ParticipCode = entity.ParticipCode,
            //        NewParticipSurname = entity.Surname,
            //        NewParticipName = entity.Name,
            //        NewParticipSecondName = entity.SecondName
            //    };

            //    models.Add(model);
            //}

            return models;
        }

        public void AddModel(RsurParticipEditModel model)
        {
            if(model != null)
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
        }

        public async Task DeleteModel(string participCode)
        {
            var entity = _participEditRepository.GetAll().Single(p => p.ParticipCode == participCode);
            _unitOfWork.DbContext.ProjectParticipsEdits.Remove(entity);
            await Task.Run(() => _unitOfWork.Save());
        }

        public async Task<bool> UpdateModel(RsurParticipEditModel model)
        {
            if (model != null)
            {
                var entity = _participRepository.GetAll().SingleOrDefault(p => p.ParticipCode == model.ParticipCode);
                if (entity == null)
                    return false;

                entity.Surname = model.NewParticipSurname;
                entity.Name = model.NewParticipName;
                entity.SecondName = model.NewParticipSecondName;

                int countOfChanges = await Task.Run(() => _unitOfWork.Save());
                if (countOfChanges < 1)
                    return false;

                return true;
            }
            else
                return false;
        }
    }
}