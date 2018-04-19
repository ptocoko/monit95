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

        public IEnumerable<ParticipTestsInExcelCreator> GetModels(CokoContext context)
        {
            var participTests = context.RsurParticipTests.Where(p => p.RsurTest.IsOpen);
            throw new NotImplementedException();
        }

        public ParticipTestsInExcelModel GetModelByAreaCode(int areaCode, CokoContext context)
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
        public string TestDate { get; set; }
        public int SubjectName { get; set; }
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
    }
}
