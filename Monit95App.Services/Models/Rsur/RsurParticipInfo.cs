using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Models.Rsur
{
    public abstract class RsurParticipInfo
    {
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
        public string SubjectName { get; set; }

        [Required]
        public string SchoolIdWithName { get; set; }

        public string CategName { get; set; }

        public int? Experience { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        public string ClassNumbers { get; set; }

        public bool HasRequestToEdit { get; set; }

        #endregion

        public RsurParticipInfo() { }

        public RsurParticipInfo(ProjectParticip entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity", "RsurParticipInfo.FillBaseInfo(ProjectParticip entity)");
            }
            ProjectCode = entity.ProjectCode;
            ParticipCode = entity.ParticipCode;
            Surname = entity.Surname;
            Name = entity.Name;
            SecondName = entity.SecondName;
            SubjectName = entity.NsurSubject.Name;
            SchoolIdWithName = $"{entity.School.Id} - {entity.School.Name.Trim()}";
            CategName = entity.Category != null ? entity.Category.Name : "";
            Experience = entity.Experience ?? -1;
            Phone = entity.Phone ?? "";
            Email = entity.Email ?? "";
            Birthday = entity.Birthday;
            ClassNumbers = entity.ClassNumbers;

            #warning refactoring
            var _db = new cokoContext();
            HasRequestToEdit = _db.ProjectParticipsEdits.SingleOrDefault(p => p.ParticipCode == entity.ParticipCode) != null ? true : false;

            FillAdditionalInfo(entity);
        }

        protected abstract void FillAdditionalInfo(ProjectParticip entity);
    }
}
