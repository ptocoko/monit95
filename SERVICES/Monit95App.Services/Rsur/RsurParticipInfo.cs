using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Core.Abstract;

namespace Monit95App.Services.Rsur
{
    public abstract class RsurParticipInfo : Person
    {        
        #region Properties

        public int ProjectCode { get; set; }

        [Required]
        public string ParticipCode { get; set; }       

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

        #endregion

        public void TemplateMethod(RsurParticip entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "RsurParticipInfo.FillBaseInfo(ProjectParticip entity)");
            }
            FillBaseInfo(entity);
            FillAdditionalInfo(entity);            
        }

        private void FillBaseInfo(RsurParticip entity)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<RsurParticip, RsurParticipFullInfo>()            
                .ForMember(dist => dist.SchoolIdWithName, opt => opt.MapFrom(s => $"{s.School.Id} - {s.School.Name.Trim()}")));            
            Mapper.Map(entity, this);
        }        
   
        protected abstract void FillAdditionalInfo(RsurParticip entity);
    }
}
