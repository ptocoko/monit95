namespace ProtocolGenerator.Interfaces
{
    public abstract class ParticipProtocol
    {        
        public string Id { get; set; } //ParticipId or ParticipCode        
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }                
        public string Marks { get; set; } //last test
        public string Grade5 { get; set; } //int or string
        public string SubjecName { get; set; }      
    }
}
