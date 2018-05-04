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

        public string DocumNumber { get; set; }
       
        public string DataSource { get; set; }
    }
}