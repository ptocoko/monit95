using System.Collections.Generic;
using System.IO;

namespace Monit95App.Services.Interfaces
{
    public interface IClassParticipImporter
    {
        (IList<ClassParticip>, IEnumerable<int>) ImportFromExcelFileStream(Stream stream, List<int> classNumbers = null); //IEnumerable<int> - numbers of excel's rows with error
    }
}
