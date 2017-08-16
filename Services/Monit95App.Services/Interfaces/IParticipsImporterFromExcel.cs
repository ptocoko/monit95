using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Excel;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipsImporterFromExcel
    {
        List<Particip> GetParticipsFromExcelPath(string path);
    }
}
