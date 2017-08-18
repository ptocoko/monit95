using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Excel;
using Monit95App.Domain.Core;
using System.IO;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipsImporterFromExcel
    {
        IList<Particip> GetFromStream(Stream excelFileStream);
    }
}
