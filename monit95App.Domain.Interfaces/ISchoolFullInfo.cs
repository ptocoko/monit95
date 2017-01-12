using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface ISchoolFullInfo : ISchoolBaseInfo
    {
        string Email { get; set; }
        int? GIAcode { get; set; } //ОГЭ/ЕГЭ        
        string Phone { get; set; }
        string VPRcode { get; set; } //СтатГрад/ВПР 
        string TownTypeName { get; set; } //город/село
    }
}
