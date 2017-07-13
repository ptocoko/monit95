using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface ISchoolInfoEditService
    {
        //bool UpdateName(string schoolId, string name);
        //bool UpdatePhoneNumbaer(string schoolId, string number);
        //bool UpdateEmail(string schoolId, string email);

        bool UpdateField(Action<School> setProperty, string schoolId);
    }
}
