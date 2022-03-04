namespace Monit95App.Services.ItakeEge.Participant
{
    /// <summary>
    /// Объект для отображения на стороне клиента
    /// </summary>
    public class ParticipGetViewDto
    {       
        public int Id { get; set; }

        public string Surname { get; set; }

        public string Name { get; set; }

        public string SecondName { get; set; }

        public string SchoolName { get; set; }

        public string ClassName { get; set; }

        public string ClassId { get; set; }

        public string DocumNumber { get; set; }
       
        public string DataSource { get; set; }

        public short? ActualCode12 { get; set; }
        public short? ActualCode22 { get; set; }

        public string PrevYearGrade { get; set; }

        public string BookAuthor { get; set; }
    }
}