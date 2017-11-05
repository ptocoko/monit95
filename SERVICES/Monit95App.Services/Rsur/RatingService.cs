using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.RegularExpressions;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services.Rsur
{
    public class RatingService : IRatingService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public RatingService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<RatingItem> CreateRatings(int areaCode)
        {
            var subjectResults = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.ActualCode == 1 // кто не выбыл
                && rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode 
                && rtr.RsurParticipTest.RsurParticip.RsurSubjectCode == 1 
                && rtr.Grade5 != null) // только тот, кто хотя бы раз участвовал в диагностике
                .GroupBy(rtr => rtr.RsurParticipTest.RsurParticip.School.Name) // SchoolName уникальный, поэтому может группировать по этому полю
                .ToList(); 
            
            var ratings = subjectResults.Select(g => new RatingItem
                {
                    SchoolName = g.Key,
                    PercentPassFirstTest = ComputePercentPassTest(g, "0101"),
                    PercentPassSecondTest = ComputePercentPassTest(g, "0102"),
                    SubjectName = "Русский язык"
                }).ToList();

            var place = 0;
            foreach (var item in ratings.OrderByDescending(x => x.PercentPassSecondTest).ThenByDescending(x => x.PercentPassFirstTest))
            {
                item.Place = ++place;
            }

            return ratings.OrderBy(x => x.Place);
        }

        [SuppressMessage("ReSharper", "MemberCanBeMadeStatic.Local")]
        [SuppressMessage("ReSharper", "PossibleMultipleEnumeration")]
        private double ComputePercentPassTest(IEnumerable<RsurTestResult> subjectResults, string testNumberCode)
        {
            var result = 0.0; // на тот случай если этот блок никто не сдавал            
            var testCount = subjectResults.Where(rtr => rtr.RsurParticipTest.RsurTest.Test.NumberCode == testNumberCode).Select(x=>x.RsurParticipTest.RsurParticipCode).Distinct().Count() * 1.0;

            // необходимо использовать Distinct() при получении количества участников по предмету, т.к. один и тот же блок мог сдавать один участник
            var subjectCount = subjectResults.Select(x => x.RsurParticipTest.RsurParticipCode).Distinct().Count() * 1.0;

            if (testCount > 0)
            {
                result = Math.Round(subjectResults.Count(rtr => rtr.RsurParticipTest.RsurTest.Test.NumberCode == testNumberCode && rtr.Grade5 == 5) * 100.0 / subjectCount, 2);
            }

            return result;
        }
    }
}
