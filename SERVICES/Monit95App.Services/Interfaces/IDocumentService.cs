using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.Document;

    public interface IDocumentService
    {
        IEnumerable<DocumentDto> GetAllBySchoolId(string schoolId);
    }
}
