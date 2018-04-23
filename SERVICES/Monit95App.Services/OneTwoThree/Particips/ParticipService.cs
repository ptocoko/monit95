using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public class ParticipService : IParticipService
    {
        private const int ProjectId = 14;
        private readonly CokoContext context;

        public ParticipService(CokoContext context)
        {
            this.context = context;
        }

        public void CreateParticip(string schoolId, ParticipDto particip)
        {
            var entity = new Particip
            {
                Surname = particip.Surname,
                Name = particip.Name,
                SecondName = particip.SecondName,
                ClassId = particip.ClassId,
                SchoolId = schoolId,
                ProjectId = 201701
            };

            context.Particips.Add(entity);
            context.SaveChanges();
        }

        public void EditParticip(int Id, string schoolId, ParticipDto particip)
        {
            var entity = context.Particips
                .Single(p => p.Id == Id && p.SchoolId == schoolId && p.ProjectId == ProjectId);

            entity.Surname = particip.Surname;
            entity.Name = particip.Name;
            entity.SecondName = particip.SecondName;
            entity.ClassId = particip.ClassId;

            context.SaveChanges();
        }

        public ParticipDto GetParticip(int Id, string schoolId)
        {
            var entity = context.Particips
                .Where(p => p.ProjectId == ProjectId && p.SchoolId == schoolId)
                .SingleOrDefault(p => p.Id == Id);

            if(entity == null)
            {
                throw new ArgumentException($"particip with ID equals to {Id} not found");
            }

            return MapToParticipDto(entity);
        }

        public IEnumerable<ParticipDto> GetParticips(string schoolId)
        {
            if(schoolId == null)
            {
                throw new ArgumentNullException($"{nameof(schoolId)} is null!");
            }

            return context.Particips
                .Where(p => p.SchoolId == schoolId && p.ProjectId == ProjectId)
                .OrderBy(ob => ob.ClassId)
                .ThenBy(tb => tb.Surname)
                .ThenBy(tb => tb.Name)
                .Select(MapToParticipDto);
        }

        public void RemoveParticip(int Id, string schoolId)
        {
            var entity = context.Particips
                .Single(p => p.SchoolId == schoolId && p.Id == Id && p.ProjectId == ProjectId);

            context.Particips.Remove(entity);
            context.SaveChanges();
        }

        private ParticipDto MapToParticipDto(Domain.Core.Entities.Particip entity)
        {
            return new ParticipDto
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
