using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public class ParticipService : IParticipService
    {
        private const int _projectId = 22;

        private readonly Dictionary<string, int[]> projectTestIdsByClass = new Dictionary<string, int[]>
        {
            ["01"] = new int[] { 3069, 3070, 3071 },
            ["02"] = new int[] { 3072, 3073, 3074 },
            ["03"] = new int[] { 3075, 3076, 3077 }
        };

        private readonly CokoContext context;

        public ParticipService(CokoContext context)
        {
            this.context = context;
        }

        public void CreateParticip(string schoolId, ParticipDto particip)
        {
            var entity = new Particip
            {
                Surname = particip.Surname.Trim(),
                Name = particip.Name.Trim(),
                SecondName = particip.SecondName.Trim(),
                ClassId = particip.ClassId,
                SchoolId = schoolId,
                ProjectId = _projectId
            };

            var classNumber = particip.ClassId.Substring(0, 2);
            var participTests = GetParticipTests(entity, projectTestIdsByClass[classNumber]);

            context.Particips.Add(entity);
            context.ParticipTests.AddRange(participTests);
            context.SaveChanges();
        }

        public void EditParticip(int Id, string schoolId, ParticipDto particip)
        {
            var entity = context.Particips
                .Single(p => p.Id == Id && p.SchoolId == schoolId && p.ProjectId == _projectId);

            entity.Surname = particip.Surname.Trim();
            entity.Name = particip.Name.Trim();
            entity.SecondName = particip.SecondName.Trim();
            entity.ClassId = particip.ClassId;

            context.SaveChanges();
        }

        public ParticipDto GetParticip(int Id, string schoolId)
        {
            var entity = context.Particips
                .Where(p => p.ProjectId == _projectId && p.SchoolId == schoolId)
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
                .Where(p => p.SchoolId == schoolId && p.ProjectId == _projectId);

            IEnumerable<ClassDto> classes = entity
                .Select(s => new ClassDto { Id = s.ClassId, Name = s.Class.Name })
                .GroupBy(gb => gb.Id)
                .Select(s => s.FirstOrDefault());

            entity = FilterQuery(entity, options);

            var totalCount = entity.Count();

            entity = entity.OrderBy(ob => ob.ClassId).ThenBy(tb => tb.Surname).ThenBy(tb => tb.Name);
            entity = entity.Skip(offset).Take(length);

            var particips = entity.Select(MapToParticipDto);

            return new ParticipList
            {
                Items = particips,
                TotalCount = totalCount,
                Classes = classes
            };
        }

        public void RemoveParticip(int Id, string schoolId)
        {
            var entity = context.Particips
                .Single(p => p.SchoolId == schoolId && p.Id == Id && p.ProjectId == _projectId);

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

        private IEnumerable<ParticipTest> GetParticipTests(Particip particip, int[] projectTestIds)
        {
            return projectTestIds.Select(projectTestId => new ParticipTest
            {
                Particip = particip,
                ProjectTestId = projectTestId
            });
        }
    }
}
