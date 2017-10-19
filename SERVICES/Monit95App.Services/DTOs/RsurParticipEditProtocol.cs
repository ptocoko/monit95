namespace Monit95App.Services.DTOs
{
    public class RsurParticipEditProtocol
    {        
        public string TestNumberCodeWithName { get; set; }

        public int RsurParticipTestId { get; set; }

        public int RsurParticipCode { get; set; }        

        public (int, string, int) RsurQuestionValues { get; set; } //Question's number in order, question's name, question's value 

        // Need for validate
        public int AreaCode { get; set; } 
    }
}
