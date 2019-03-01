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
            ParticipTestsInExcelCreator cretor = new ParticipTestsInExcelCreator(context, "02-19", "Февраль-2019");
            var models = cretor.GetModels(new int[] { 3186, 3187, 3188, 3189 });
            foreach (var model in models)
            {
                cretor.SaveModelsIntoExcel(model);
            }
        }

        private static void GenerateParticipTests(CokoContext context)
        {
            var rsurTestNumberCodeDict = new Dictionary<string, int>
            {
                {"0701", 3186 },
                {"0702", 3187 },
                {"0703", 3188 },
                {"0704", 3189 },
            };

            var whoMustPass = GetWhoMustPass(context.RsurParticips.Where(p => new int[] { 7 }.Contains(p.RsurSubjectCode) && p.SchoolId != "0000"));

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
