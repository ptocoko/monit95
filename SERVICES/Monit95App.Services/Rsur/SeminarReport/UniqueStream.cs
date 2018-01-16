using System.IO;

namespace Monit95App.Services.Rsur.SeminarReport
{
    // TODO: refactoring, i thing need also override Equals()
    public class UniqueStream
    {        
        public string FileName { get; set; }

        public Stream Stream { get; set; } 
    }
}
