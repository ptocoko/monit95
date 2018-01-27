namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Участник тестирования
    /// </summary>
    /// <example>Описание участника тестирования</example>
    public class Particip
    {
        public int Id { get; set; }                            
        public string Surname { get; set; }        
        public string Name { get; set; }        
        public string SecondName { get; set; }

        /// <summary>
        /// Номер документа (паспорта)
        /// </summary>
        public int? DocumNumber { get; set; }

        public string Phone { get; set; }
        public string Email { get; set; }
        
        /// <summary>
        /// Посещал ли ДОО
        /// </summary>
        /// <remarks>
        /// Посещал ли дошколную образовательную организацию (садик)?
        /// </remarks>
        public bool? WasDoo { get; set; }

        public DateTime? Birthday { get; set; }
        public string DataSource { get; set; }
        public DateTime? AddedDate { get; set; }
        public int ProjectId { get; set; }        
        public Project Project { get; set; }
        public string SchoolId { get; set; }
        public virtual School School { get; set; }                
        public virtual ICollection<ParticipTest> ParticipTests { get; set; } = new HashSet<ParticipTest>();                
    }
}
