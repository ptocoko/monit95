using monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    public interface ISchoolRepository
    {
        school GetById(string schoolID);
    }
}
