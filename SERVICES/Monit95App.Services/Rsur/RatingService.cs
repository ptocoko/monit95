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

        // TODO: need refactoring
        public IEnumerable<RatingItem> CreateRatings(int areaCode)
        {
            var allSubjectResults = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.ActualCode == 1 // кто не выбыл
                && rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode 
                && rtr.Grade5 != null) // только тот, кто хотя бы раз участвовал в диагностике
                .GroupBy(rtr => rtr.RsurParticipTest.RsurParticip.School.Name) // SchoolName уникальный, поэтому можно группировать по этому полю
                .ToList();

            if (!allSubjectResults.Any())
            {
                throw new ArgumentException(nameof(areaCode));
            }

            var place = 0;
            // РУ
            var rating1 = allSubjectResults.Select(g => new RatingItem
                {
                    SchoolName = g.Key,
                    PercentPassFirstTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 1), "0101"),
                    PercentPassSecondTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 1), "0102"),
                    SubjectName = "Русский язык"
                }).ToList();            
            foreach (var item in rating1.OrderByDescending(x => x.PercentPassSecondTest).ThenByDescending(x => x.PercentPassFirstTest))
            {
                item.Place = ++place;
            }

            // МА
            place = 0;
            var rating2 = allSubjectResults.Select(g => new RatingItem
            {
                SchoolName = g.Key,
                PercentPassFirstTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 2), "0201"),
                PercentPassSecondTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 2), "0202"),
                SubjectName = "Математика"
            }).ToList();
            foreach (var item in rating2.OrderByDescending(x => x.PercentPassSecondTest).ThenByDescending(x => x.PercentPassFirstTest))
            {
                item.Place = ++place;
            }

            // ИС
            place = 0;
            var rating7 = allSubjectResults.Select(g => new RatingItem
            {
                SchoolName = g.Key,
                PercentPassFirstTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 7), "0701"),
                PercentPassSecondTest = ComputePercentPassTest(g.Where(d => d.RsurParticipTest.RsurParticip.RsurSubjectCode == 7), "0702"),
                SubjectName = "История"
            }).ToList();
            foreach (var item in rating7.OrderByDescending(x => x.PercentPassSecondTest).ThenByDescending(x => x.PercentPassFirstTest))
            {
                item.Place = ++place;
            }

            return rating1.Union(rating2).Union(rating7);            
        }

        [SuppressMessage("ReSharper", "MemberCanBeMadeStatic.Local")]
        [SuppressMessage("ReSharper", "PossibleMultipleEnumeration")]
        private double ComputePercentPassTest(IEnumerable<RsurTestResult> subjectResults, string testNumberCode)
        {
            var result = 0.0; // на тот случай если этот блок никто не сдавал            
            var testCount = subjectResults.Where(rtr => rtr.RsurParticipTest.RsurTest.Test.NumberCode == testNumberCode).Select(x => x.RsurParticipTest.RsurParticipCode).Distinct().Count() * 1.0;

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
