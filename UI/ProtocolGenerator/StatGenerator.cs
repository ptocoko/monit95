using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class StatGenerator
    {
        private readonly CokoContext context;

        public StatGenerator(CokoContext context)
        {
            this.context = context;
        }

        public void Generate()
        {

            using (var excel = new ClosedXML.Excel.XLWorkbook(@"D:\Work\stat_template.xlsx"))
            {
                var sheet = excel.Worksheet("List1");
                var entity = context.ParticipTests
                    .Where(pt => pt.ProjectTestId == 2020)
                    .Select(pt => pt.Particip.School)
                    .Distinct()
                    .Select(s => new
                    {
                        SchoolName = s.Name,
                        SchoolId = s.Id,
                        s.AreaCode,
                        AvgMarks = context.QuestionMarks
                            .Where(qm => qm.ParticipTest.Particip.SchoolId == s.Id && qm.ParticipTest.ProjectTestId == 2020)
                            .Select(qm => new { qm.AwardedMark, qm.Question.MaxMark, qm.Question.Order })
                            .GroupBy(gb => new { gb.Order, gb.MaxMark })
                            .OrderBy(ob => ob.Key.Order)
                            .Select(avg => avg.Select(mark => mark.AwardedMark).Sum() / (avg.Count() * avg.Key.MaxMark))
                    })
                    .OrderBy(ob => ob.AreaCode).ThenBy(tb => tb.SchoolId);

                int i = 5;
                foreach(var order in entity)
                {
                    sheet.Cell(i, 1).Value = order.AreaCode;
                    sheet.Cell(i, 2).Value = order.SchoolName;

                    int j = 3;
                    foreach(var avgMark in order.AvgMarks)
                    {
                        sheet.Cell(i, j).Value = avgMark;

                        j++;
                    }

                    i++;
                }

                    
                //int i = 4;
                //foreach (var school in entity)
                //{
                //    sheet.Cell(i, 2).Value = school.Key;

                //    int j = 3;
                //    foreach (var order in school)
                //    {
                //        sheet.Cell(i, j).Value = order.
                //    }

                //    i++;
                //}
                

                excel.Save();
            }
        }
    }
}
