using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RsurParticipTestsCreator
{
    class Program
    {
        static void Main(string[] args)
        {
            CokoContext context = new CokoContext();
            //GenerateParticipTests(context);
            ParticipTestsInExcelCreator cretor = new ParticipTestsInExcelCreator(context, "10-20", "Октябрь-2020");
            var models = cretor.GetModelsForSchools(new int[] { 5278, 5279, 5280, 5281, 5282 });
            foreach (var model in models)
            {
                cretor.SaveModelsIntoExcelForSchool(model);
            }
        }

        private static void GenerateParticipTests(CokoContext context)
        {
            var rsurTestNumberCodeDict = new Dictionary<string, int>
            {
                {"0101", 4239 },
                {"0102", 4240 },
                {"0103", 4241 },
                {"0104", 4242 },
                {"0201", 4243 },
                {"0202", 4244 },
                {"0203", 4245 },
                {"0701", 4246 },
                {"0702", 4247 },
                {"0703", 4248 },
                {"0704", 4249 },
                {"0801", 4250 },
                {"0802", 4251 },
                {"0803", 4252 },
                {"0804", 4253 },
                {"0302", 4255 },
                {"0303", 4256 },
                {"0304", 4257 },
                {"1202", 4259 },
                {"1203", 4260 },
                {"1204", 4261 },
                {"1205", 4262 },
            };

            var whoMustPass = GetWhoMustPass(context.RsurParticips.Where(p => new int[] { 1, 2, 7, 8 }.Contains(p.RsurSubjectCode) && p.SchoolId != "0000"));

            var notPassLastExam = GetNotPassLastExam(whoMustPass);
            var passLastExam = GetPassLastExam(whoMustPass);
            var notHaveResults = GetHaveNotResults(whoMustPass);

            var participTests = new List<RsurParticipTest>();
            foreach (var particip in notPassLastExam.Select(s => new { s.Code, s.RsurParticipTests.OrderByDescending(ob => ob.RsurTestId).FirstOrDefault().RsurTest.Test.NumberCode }))
            {
                participTests.Add(new RsurParticipTest
                {
                    RsurTestId = rsurTestNumberCodeDict[particip.NumberCode],
                    RsurParticipCode = particip.Code,
                    Editable = true
                });
            }

            int blockNumber;
            string nextNumberCode;
            foreach (var particip in passLastExam.Select(s => new { s.Code, s.RsurParticipTests.OrderByDescending(ob => ob.RsurTestId).FirstOrDefault().RsurTest.Test.NumberCode }))
            {
                blockNumber = int.Parse(particip.NumberCode.Last().ToString());
                nextNumberCode = $"{particip.NumberCode.Substring(0, 3)}{++blockNumber}";
                participTests.Add(new RsurParticipTest
                {
                    RsurTestId = rsurTestNumberCodeDict[nextNumberCode],
                    RsurParticipCode = particip.Code,
                    Editable = true
                });
            }

            string numberCode;
            foreach (var particip in notHaveResults.Select(s => new { s.Code, s.RsurSubjectCode}))
            {
                numberCode = $"0{particip.RsurSubjectCode}01";
                participTests.Add(new RsurParticipTest
                {
                    RsurTestId = rsurTestNumberCodeDict[numberCode],
                    RsurParticipCode = particip.Code,
                    Editable = true
                });
            }
            context.RsurParticipTests.AddRange(participTests);
            context.SaveChanges();
            Console.WriteLine("All done!");
        }

        private static IQueryable<RsurParticip> GetWhoMustPass(IQueryable<RsurParticip> rsurParticips)
        {
            return rsurParticips
                .Where(p => new int[] { 1, 3, 4 }.Contains(p.ActualCode) && !p.RsurParticipTests.Any(rpt => rpt.RsurTest.Test.IsFinal && rpt.RsurTestResult.Grade5 == 5));
        }

        private static IQueryable<RsurParticip> GetPassLastExam(IQueryable<RsurParticip> whoMustPass)
        {
            return whoMustPass.Where(p => p.RsurParticipTests.Any() 
                                           && p.RsurParticipTests
                                               .Where(pt => pt.RsurTest.RsurExamName.IsGeneralRsur)
                                               .OrderByDescending(ob => ob.RsurTestId)
                                               .FirstOrDefault()
                                               .RsurTestResult
                                               .Grade5 == 5);
        }

        private static IQueryable<RsurParticip> GetNotPassLastExam(IQueryable<RsurParticip> whoMustPass)
        {
            return whoMustPass.Where(p => p.RsurParticipTests.Any() 
                                            && p.RsurParticipTests
                                            .Where(pt => pt.RsurTest.RsurExamName.IsGeneralRsur)
                                            .OrderByDescending(ob => ob.RsurTestId)
                                            .FirstOrDefault()
                                            .RsurTestResult.Grade5 != 5);
        }

        private static IQueryable<RsurParticip> GetHaveNotResults(IQueryable<RsurParticip> whoMustPass)
        {
            return whoMustPass.Where(p => !p.RsurParticipTests
                                            .Where(pt => pt.RsurTest.RsurExamName.IsGeneralRsur)
                                            .Any());
        }
    }
}
