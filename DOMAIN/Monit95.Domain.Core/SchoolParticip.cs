namespace Monit95App.Domain.Core
{
    public class SchoolParticip
    {
        public string Surname { get; set; }

        public string Name { get; set; }

        public string SecondName { get; set; }
        
        /// <example>"Школа номер 1" || "0001 - Школа номер 1"</example>
        public string SchoolName { get; set; }
    }
}
