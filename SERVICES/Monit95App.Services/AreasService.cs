using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class AreasService
    {
        private readonly CokoContext context;

        public AreasService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<AreaDto> GetAll()
        {
            return context.Areas.Where(a => a.Code != 1000).Select(s => new AreaDto
            {
                Code = s.Code,
                Name = s.Name.Trim()
            });
        }
    }
}
