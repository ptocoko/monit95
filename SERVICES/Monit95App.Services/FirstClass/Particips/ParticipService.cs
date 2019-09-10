using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ParticipService : IParticipService
    {
        private readonly CokoContext context;

        public ParticipService(CokoContext context)
        {
            this.context = context;
        }

        public async Task CreateParticip(string schoolId, int projectId, ParticipPostDto particip)
        {
            var entity = new Particip
            {
                Surname = particip.Surname,
                Name = particip.Name,
                SecondName = particip.SecondName,
                Birthday = particip.Birthday,
                ClassId = particip.ClassId,
                SchoolId = schoolId,
                ProjectId = projectId,
                WasDoo = particip.WasDoo
            };

            context.Particips.Add(entity);
            //context.SaveChanges();

            var participTest = new ParticipTest
            {
                ParticipId = entity.Id,
                ProjectTestId = 3078
            };
            context.ParticipTests.Add(participTest);
            await context.SaveChangesAsync();
        }

        public async Task EditParticip(int Id, string schoolId, ParticipPostDto particip)
        {
            var entity = await context.Particips
                .SingleAsync(p => p.Id == Id && p.SchoolId == schoolId);

            entity.Surname = particip.Surname;
            entity.Name = particip.Name;
            entity.SecondName = particip.SecondName;
            entity.Birthday = particip.Birthday;
            entity.ClassId = particip.ClassId;
            entity.WasDoo = particip.WasDoo;

            await context.SaveChangesAsync();
        }

        public async Task<ParticipGetDto> GetParticip(int Id, string schoolId)
        {
            var entity = await context.Particips
                .Where(p => p.SchoolId == schoolId)
                .Include("Class")
                .SingleOrDefaultAsync(p => p.Id == Id);

            if (entity == null)
            {
                throw new ArgumentException($"particip with ID equals to {Id} not found");
            }

            return MapToParticipDto.Compile()(entity);
        }

        public async Task<ParticipList> GetParticips(string schoolId, int projectId, GetAllOptions options)
        {
            if (schoolId == null)
            {
                throw new ArgumentNullException($"{nameof(schoolId)} is null!");
            }

            int offset = (int)((options.Page - 1) * options.Length);
            int length = (int)options.Length;

            var entity = context.Particips
                .AsNoTracking()
                .Where(p => p.SchoolId == schoolId && p.ProjectId == projectId);

            IEnumerable<ClassDto> classes = await entity
                .Select(s => new ClassDto { Id = s.ClassId, Name = s.Class.Name })
                .GroupBy(gb => gb.Id)
                .Select(s => s.FirstOrDefault())
                .ToListAsync();

            entity = FilterQuery(entity, options);

            var totalCount = await entity.CountAsync();

            entity = entity.OrderBy(ob => ob.ClassId).ThenBy(tb => tb.Surname).ThenBy(tb => tb.Name);
            entity = entity.Skip(offset).Take(length);

            var particips = await entity.Select(MapToParticipDto).ToListAsync();

            return new ParticipList
            {
                Items = particips,
                TotalCount = totalCount,
                Classes = classes
            };
        }

        public async Task RemoveParticip(int Id, string schoolId)
        {
            var entity = await context.Particips
                .SingleAsync(p => p.SchoolId == schoolId && p.Id == Id);

            context.Particips.Remove(entity);
            await context.SaveChangesAsync();
        }

        private Expression<Func<Particip, ParticipGetDto>> MapToParticipDto = 
            (entity) =>  new ParticipGetDto
            {
                Id = entity.Id,
                Surname = entity.Surname,
                Name = entity.Name,
                SecondName = entity.SecondName,
                Birthday = entity.Birthday,
                ClassName = entity.Class.Name,
                ClassId = entity.ClassId,
                WasDoo = entity.WasDoo
            };
        
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
