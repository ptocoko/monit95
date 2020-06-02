using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report2
{
    public class Report2Service
    {
        private readonly CokoContext context;

        public Report2Service(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<SchoolReportDto> GetSchoolsReports(int areaCode, int projectTestId)
        {
            return context.ParticipTests
                .Where(pt => pt.ProjectTestId == projectTestId && pt.Particip.School.AreaCode == areaCode && pt.Grade5.HasValue)
                .GroupBy(pt => new { pt.Particip.SchoolId, SchoolName = pt.Particip.School.Name.Trim() })
                .OrderBy(ob => ob.Key.SchoolId)
                .ToList()
                .Select(s => new SchoolReportDto
                {
                    SchoolId = s.Key.SchoolId,
                    SchoolName = s.Key.SchoolName,
                    Report = new ReportDto
                    {
                        Pass = s.Count(c => c.Grade5 == 5),
                        NotPass = s.Count(c => c.Grade5 == 2),
                        Absent = s.Count(c => c.Grade5 < 0)
                    }
                });
        }
    }
}
