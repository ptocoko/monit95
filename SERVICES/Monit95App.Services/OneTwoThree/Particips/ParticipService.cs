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

        public ParticipList GetParticips(string schoolId, GetAllOptions options)
        {
            if(schoolId == null)
            {
                throw new ArgumentNullException($"{nameof(schoolId)} is null!");
            }

            int offset = (int)((options.Page - 1) * options.Length);
            int length = (int)options.Length;

            var entity = context.Particips
                .AsNoTracking()
                .Where(p => p.SchoolId == schoolId && p.ProjectId == ProjectId);
            var totalCount = entity.Count();

            entity = FilterQuery(entity, options);
            entity = entity.OrderBy(ob => ob.ClassId).ThenBy(tb => tb.Surname).ThenBy(tb => tb.Name);
            entity = entity.Skip(offset).Take(length);

            var particips = entity.Select(MapToParticipDto);

            return new ParticipList
            {
                Items = particips,
                TotalCount = totalCount
            };
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

        private IQueryable<Particip> FilterQuery(IQueryable<Particip> particips, GetAllOptions options)
        {
            if (!String.IsNullOrEmpty(options.Search))
            {
                particips = particips.Where(p => p.Id.ToString().Contains(options.Search)
                                              || p.Surname.Contains(options.Search)
                                              || p.Name.Contains(options.Search));
            }

            if (!String.IsNullOrEmpty(options.ClassId))
            {
                particips = particips.Where(p => p.ClassId == options.ClassId);
            }

            return particips;
        }
    }
}
