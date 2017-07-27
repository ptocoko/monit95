﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Services.Rsur
{
    public abstract class RsurParticipInfo
    {
        #region Fields
                
        private readonly IGenericRepository<ProjectParticipsEdit> _rsurParticipEditRepository;
        
        #endregion

        protected RsurParticipInfo()
        {
            
        }

        protected RsurParticipInfo(IGenericRepository<ProjectParticipsEdit> rsurParticipEditRepository)
        {
            _rsurParticipEditRepository = rsurParticipEditRepository;
        }

        #region Properties

        public int ProjectCode { get; set; }

        [Required]
        public string ParticipCode { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string SecondName { get; set; }

        [Required]
        public string NsurSubjectName { get; set; }

        [Required]
        public string SchoolIdWithName { get; set; }

        public string CategoryName { get; set; }

        public int? Experience { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        public string ClassNumbers { get; set; }

        public bool HasRequestToEdit { get; set; }

        #endregion

        public void TemplateMethod(ProjectParticip entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "RsurParticipInfo.FillBaseInfo(ProjectParticip entity)");
            }
            FillBaseInfo(entity);
            FillAdditionalInfo(entity);
        }

        private void FillBaseInfo(ProjectParticip entity)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ProjectParticip, RsurParticipFullInfo>()
                .ForMember("SchoolIdWithName", opt => opt.MapFrom(s => $"{s.School.Id} - {s.School.Name.Trim()}")));
            Mapper.Map(entity, this);                                                
                                                
            HasRequestToEdit = _rsurParticipEditRepository.GetById(entity.ParticipCode) != null;
        }        
   
        protected abstract void FillAdditionalInfo(ProjectParticip entity);
    }
}
