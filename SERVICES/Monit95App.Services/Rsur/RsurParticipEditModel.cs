namespace Monit95App.Services.Rsur
{
    public class RsurParticipEditModel
    {
        public string ParticipCode { get; set; }
        
        public string NewParticipSurname { get; set; }
        public string OldParticipSurname { get; set; }
        
        public string NewParticipName { get; set; }
        public string OldParticipName { get; set; }

        public string NewParticipSecondName { get; set; }
        public string OldParticipSecondName { get; set; }
    }
}
