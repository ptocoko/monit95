namespace Monit95App.Services.Rsur.Report
{
    public class ParticipReport
    {
        public string Code { get; set; }

        public string Surname { get; set; }

        public string Name { get; set; }

        public string SecondName { get; set; }

        public string SchoolIdWithName { get; set; }

        public string TestNameWithDate { get; set; } // e.g.: Орфография, 11.10.2017

        public string IsPassTest { get; set; } // зачет/незачет
    }
}
