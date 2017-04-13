using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        cokoContext DbContext { get; }
        int Save();
    }
}
