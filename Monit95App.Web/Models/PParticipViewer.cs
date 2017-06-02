using Monit95App.Domain.Core;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class PParticipViewer : IPParticipViewer
    {
        public PParticipViewModel CreateViewModel(ProjectParticip entity)
        {
            var vm = new PParticipViewModel
            {
                ProjectCode = entity.ProjectCode,
                ParticipCode = entity.ParticipCode,
                Surname = entity.Surname,
                Name = entity.Name,
                SecondName = entity.SecondName,
                SubjectName = entity.NsurSubject.Name,
                SchoolIdWithName = $"{entity.School.Id} - {entity.School.Name}",
                CategName = entity.Category != null ? entity.Category.Name : "",
                Experience = entity.Experience != null ? entity.Experience : -1,
                Phone = entity.Phone != null ? entity.Phone : "",
                Email = entity.Email != null ? entity.Email : "",
                Birthday = entity.Birthday,
                ClassNumbers = entity.ClassNumbers
            };
            return vm;
        }
    }
}