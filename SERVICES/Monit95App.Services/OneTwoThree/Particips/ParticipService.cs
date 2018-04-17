﻿using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public class ParticipService : IParticipService
    {
        private readonly CokoContext context;

        public ParticipService(CokoContext context)
        {
            this.context = context;
        }

        public Particip GetParticip(int Id)
        {
            var entity = context.Particips.Find(Id);

            if(entity == null)
            {
                throw new ArgumentException($"particip with ID equals to {Id} not found");
            }

            return MapToParticipDto(entity);
        }

        public IEnumerable<Particip> GetParticips(string schoolId)
        {
            if(schoolId == null)
            {
                throw new ArgumentNullException($"{nameof(schoolId)} is null!");
            }

            return context.Particips.Where(p => p.SchoolId == schoolId).Select(MapToParticipDto);
        }

        private Particip MapToParticipDto(Domain.Core.Entities.Particip entity)
        {
            return new Particip
            {
                Id = entity.Id,
                Surname = entity.Surname,
                Name = entity.Name,
                SecondName = entity.SecondName,
                ClassName = entity.Class.Name,
                ClassId = entity.ClassId
            };
        }
    }
}
