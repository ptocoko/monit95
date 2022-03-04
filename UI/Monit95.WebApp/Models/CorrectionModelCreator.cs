using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public static class CorrectionModelCreator
    {
        private static CokoContext _context;

        public static IEnumerable<CorrectionModel> CreateModels(CokoContext context)
        {
            _context = context;

            return _context.SchoolEdits.Join(_context.Schools, ok => ok.Id, ik => ik.Id, (ok, ik) => new CorrectionModel { SchoolId = ok.Id, NewName = ok.Name, OldName = ik.Name }).ToList();
        }
    }
}