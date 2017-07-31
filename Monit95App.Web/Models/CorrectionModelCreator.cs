using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public static class CorrectionModelCreator
    {
        private static cokoContext _context;

        public static IEnumerable<CorrectionModel> CreateModels(cokoContext context)
        {
            _context = context;

            return _context.SchoolEdits.Join(_context.Schools, ok => ok.Id, ik => ik.Id, (ok, ik) => new CorrectionModel { SchoolId = ok.Id, NewName = ok.Name, OldName = ik.Name }).ToList();
        }
    }
}