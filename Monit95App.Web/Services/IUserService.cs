using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public interface IUserService
    {
        UserModel GetModel(string userId);
    }
}
