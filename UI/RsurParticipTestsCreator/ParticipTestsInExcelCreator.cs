using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RsurParticipTestsCreator
{
    internal class ParticipTestsInExcelCreator
    {
        private readonly CokoContext _context;

        public ParticipTestsInExcelCreator(CokoContext cokoContext)
        {
            _context = cokoContext;
        }

        public IEnumerable<ParticipTestsInExcelModel> GetModels(string subjectPrefix)
        {
            return _context.RsurParticipTests
                .AsNoTracking()
                .Where(p => p.RsurTest.IsOpen && p.RsurTest.Test.NumberCode.Substring(0, 2) == subjectPrefix && p.RsurParticip.School.AreaCode != 1000)
                .GroupBy(gb => new
                {
                    gb.RsurParticip.School.AreaCode,
                    gb.RsurTest.TestDate,
                    SubjectName = gb.RsurParticip.RsurSubject.Name
                })
                .Select(s => new ParticipTestsInExcelModel
                {
                    AreaCode = s.Key.AreaCode,
                    TestDate = s.Key.TestDate,
                    SubjectName = s.Key.SubjectName,
                    ParticipTests = s.Select(selector => new ParticipTestModel
                    {
                        Code = selector.RsurParticipCode,
                        Surname = selector.RsurParticip.Surname,
                        Name = selector.RsurParticip.Name,
                        SecondName = selector.RsurParticip.SecondName,
                        SchoolName = selector.RsurParticip.School.Name,
                        BlockName = selector.RsurTest.Test.Name,
                        NumberCode = selector.RsurTest.Test.NumberCode
                    })
                    .OrderBy(ob => ob.NumberCode)
                    .ThenBy(tb => tb.Code)
                }).ToArray();
        }

        public ParticipTestsInExcelModel GetModelByAreaCode(string subjectPrefix, int areaCode, CokoContext context)
        {
            throw new NotImplementedException();
        }

        public void SaveModelsIntoExcel(IEnumerable<ParticipTestsInExcelModel> models)
        {
            throw new NotImplementedException();
        }


    }

    internal class ParticipTestsInExcelModel
    {
        public int AreaCode { get; set; }
        public DateTime TestDate { get; set; }
        public string SubjectName { get; set; }
        public IEnumerable<ParticipTestModel> ParticipTests { get; set; }
    }

    internal class ParticipTestModel
    {
        public int Code { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolName { get; set; }
        public string BlockName { get; set; }
        public string NumberCode { get; set; }
    }
}
