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
        public Particip()
        {
            AddedDate = DateTime.Now;
        }

        public int Id { get; set; }                            
        public string Surname { get; set; }        
        public string Name { get; set; }        
        public string SecondName { get; set; }

        /// <summary>
        /// Номер документа (паспорта)
        /// </summary>
        public string DocumNumber { get; set; }

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
        public short? ActualCode12 { get; set; }
        public short? ActualCode22 { get; set; }
        public string PrevYearGrade { get; set; }
        public string BookAuthor { get; set; }
        public string ClassId { get; set; }
        public virtual Class Class { get; set; }
        public int ProjectId { get; set; }        
        public Project Project { get; set; }
        public string SchoolId { get; set; }
        public virtual School School { get; set; }    
        public virtual FirstClassGrades FirstClassGrades { get; set; }
        public virtual ICollection<ParticipTest> ParticipTests { get; set; } = new HashSet<ParticipTest>();                
    }
}
