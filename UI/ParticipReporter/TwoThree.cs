using Monit95App.Infrastructure.Data;
using Monit95App.Services.TwoThree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public class TwoThree
    {
        public void ImportAndSaveAll(ResultsImporter resultsImporter, int repositoryId)
        {
            foreach(string testCode in new string[] { "0204", "0304" })
            {
                resultsImporter.ImportAndSave(testOptions[testCode], repositoryId);
            }
        }

        public void ImportAndSaveBySchoolIdAndTest(CokoContext context, ResultsImporter resultsImporter, int repositoryId, string schoolId, string testcode)
        {
            var destFolderPath = context.Repositories.Find(repositoryId).Path;
            var results = resultsImporter.ImportModels(testOptions[testcode], schoolId, destFolderPath);
            resultsImporter.SaveModels(results, testOptions[testcode].MaxMarks);
        }

        public void GenerateReports(Reporter reporter)
        {
            // reporter.F0_ParticipsResults();
            reporter.GenerateReports();
        }

        private readonly Dictionary<string, TestOptions> testOptions = new Dictionary<string, TestOptions>
        {
            ["0204"] = new TestOptions
            {
                Code = "0204",
                Years = "2019/2020",
                MarksCount = 8,
                MinMidMark = 6,
                MaxMidMark = 7,
                MaxMarks = new int[] { 1, 1, 1, 1, 2, 1, 1, 1 }
            },
            ["0304"] = new TestOptions
            {
                Code = "0304",
                Years = "2019/2020",
                MarksCount = 7,
                MinMidMark = 4,
                MaxMidMark = 6,
                MaxMarks = new int[] { 1, 1, 1, 1, 1, 1, 2 }
            }
        };
    }
}
