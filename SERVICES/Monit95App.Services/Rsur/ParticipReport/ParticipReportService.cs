using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using System.Globalization;
using ServiceResult;
using System.Data.Entity;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReportService : IParticipReportService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public ParticipReportService(CokoContext context)
        {
            this.context = context;
        }

        public ServiceResult<ParticipExtendReport> GetExtendReport(int rsurParticipTestId, int? areaCode = null, string schoolId = null)
        {
            var serviceResult = new ServiceResult<ParticipExtendReport>
            {
                Result = new ParticipExtendReport()
            };

            // Начало запроса
            var query = context.RsurTestResults.Where(rtr => rtr.RsurParticipTestId == rsurParticipTestId);

            // Фильтр по муниципалитету
            if (areaCode != null)
                query = query.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode);

            // Фильтр по школе
            if (schoolId != null)
                query = query.Where(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId == schoolId);

            // Получаем сущность и сразу валидируем
            var entity = query.SingleOrDefault();
            if(entity == null || entity.Grade5 == null)
            {
                serviceResult.Errors.Add(new ServiceError { HttpCode = 404, Description = $"Возможно {nameof(rsurParticipTestId)}: '{rsurParticipTestId}' указан не верно" +
                                                                                   $" или данный участник отсутствовал на диагностике"});
                return serviceResult;
            }

            serviceResult.Result.FullParticipName = $"{entity.RsurParticipTest.RsurParticip.Surname.ToUpper()} {entity.RsurParticipTest.RsurParticip.Name.ToUpper()} {entity.RsurParticipTest.RsurParticip.SecondName?.ToUpper()}";
            serviceResult.Result.SchoolParticipInfo = new SchoolParticip
            {                
                SchoolName = entity.RsurParticipTest.RsurParticip.School.Name
            };

            serviceResult.Result.ParticipCode = entity.RsurParticipTest.RsurParticipCode;
            serviceResult.Result.TestStatus = entity.Grade5 == 2 ? "НЕЗАЧЕТ" : "ЗАЧЕТ";
            serviceResult.Result.Grade5 = entity.Grade5;
            serviceResult.Result.TestDateString = entity.RsurParticipTest.RsurTest.TestDate.ToShortDateString();
            serviceResult.Result.TestName = $"{entity.RsurParticipTest.RsurTest.Test.NumberCode} — {entity.RsurParticipTest.RsurTest.Test.Name}";
            serviceResult.Result.TestNumberCode = entity.RsurParticipTest.RsurTest.Test.NumberCode;
            serviceResult.Result.RsurTestId = entity.RsurParticipTest.RsurTestId;

            serviceResult.Result.Marks = entity.RsurQuestionValues.Split(';').Select(int.Parse).ToArray();

            // Формирование EgeQuestionResults
            serviceResult.Result.EgeQuestionResults = new List<EgeQuestionResult>();
            var egeQuestionValuesArray = entity.EgeQuestionValues.Split(';');
            foreach (var egeQuestionValueString in egeQuestionValuesArray)
            {
                // Get egeQuestionNumber from egeQuestionValueString = "2(70%)" (e.g.) 
                var egeQuestionNumber = int.Parse(Regex.Match(egeQuestionValueString, @"\d+(?=\()").Value); // '(?=\()' - исключить из результата открывающую скобку                

                var egeQuestionResult = new EgeQuestionResult
                {
                    EgeQuestionNumber = egeQuestionNumber,
                    Value = double.Parse(Regex.Match(egeQuestionValueString, @"\d+\.*\d*(?=%)").Value.Replace('.', ','), CultureInfo.CreateSpecificCulture("ru-RU")) // get egeQuestionValue from egeQuestionValueString = "2(70%)" (e.g.) 
                };

                // Получение заданий КИМ РСУР, которые проверяют номер egeQuestionNumber задание КИМ ЕГЭ
                var rsurQuestions = entity.RsurParticipTest.RsurTest.Test.Questions.Where(rq => rq.EgeQuestion.Order == egeQuestionNumber);
                egeQuestionResult.RsurQuestionNumbers = rsurQuestions.Select(rq => rq.Order.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");

                // ElementNames
                egeQuestionResult.ElementNames = rsurQuestions.First().EgeQuestion.ElementNames;                

                serviceResult.Result.EgeQuestionResults.Add(egeQuestionResult);
            }            

            return serviceResult;
        }

        public ServiceResult<ReportsListDto> GetReports(ReportsListOptions options, int? areaCode = null, string schoolId = null)
        {
            var serviceResult = new ServiceResult<ReportsListDto>();
            IQueryable<RsurTestResult> entities;

            if(areaCode != null)
                entities = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode);
            else if(schoolId != null)
                entities = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId == schoolId);
            else
            {
                serviceResult.Errors.Add(new ServiceError { Description = "Неавторизированный запрос!", HttpCode = 401 });
                return serviceResult;
            }

            serviceResult.Result = GetResults(queryable: entities, options: options);

            return serviceResult;
        }

        public ServiceResult<ReportsInfo> GetReportsInfo(int? areaCode, string schoolId = null)
        {
            var serviceResult = new ServiceResult<ReportsInfo>();

            var minDateTime = new DateTime(2017, 4, 20);
            //var maxDateTime = new DateTime(2018, 10, 4);

            IQueryable<RsurTestResult> entities = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurTest.TestDate >= minDateTime   // начало с апреля  
                                                                             && rtr.RsurParticipTest.RsurTest.IsShown.Value
                                                                             && rtr.RsurParticipTest.RsurParticip.ActualCode == 1);

            if (areaCode != null)
                entities = entities.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode);
            else if (schoolId != null)
                entities = entities.Where(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId == schoolId);
            else
            {
                serviceResult.Errors.Add(new ServiceError { Description = "Неавторизированный запрос!", HttpCode = 401 });
                return serviceResult;
            }

            //entities = entities.Include(inc => inc.RsurParticipTest.RsurTest.Test).Include(inc => inc.RsurParticipTest.RsurParticip.School);
            serviceResult.Result = new ReportsInfo
            {
                SchoolNames = GetSchoolNames(entities),
                TestNames = GetTestNames(entities),
                ExamNames = entities.Select(s => new ExamDto
                {
                    Name = s.RsurParticipTest.RsurTest.ExamName.Trim(),
                    Code = s.RsurParticipTest.RsurTest.ExamCode.Trim(),
                    Date = s.RsurParticipTest.RsurTest.RsurExamName.Date
                })
                .Distinct()
                .OrderBy(ob => ob.Date)
            };

            return serviceResult;
        }


        #region Private methods
        
        /// <summary>
        /// Завершает формирование запроса на получение отчетов и выполняет его
        /// </summary>
        /// <param name="queryable"></param>
        /// <param name="testDate"></param>
        /// <returns></returns>        
        private ReportsListDto GetResults(IQueryable<RsurTestResult> queryable, ReportsListOptions options)
        {            
            var minDateTime = new DateTime(2017, 4, 20);
            //var maxDateTime = new DateTime(2018, 10, 4);

            queryable = queryable.Where(rtr => rtr.RsurParticipTest.RsurTest.TestDate >= minDateTime   // начало с апреля
                                                  && rtr.RsurParticipTest.RsurTest.IsShown.Value
                                                  && rtr.RsurParticipTest.RsurParticip.ActualCode == 1);

            queryable = FilterTestResults(queryable, options);

            int total_count = queryable.Count();

            // нужно отсортировать список до того как он будет обрезан на страницу
            queryable = SortTestResults(queryable);

            int offset = (int)((options.Page - 1) * options.Length);
            queryable = queryable.Skip(offset).Take((int)options.Length);
            
            // TODO: Разница между AsEnumerable vs IQuerably and Linq Entities vs Linq to Object
            var testResults = queryable.AsEnumerable()
                                       .Select(MapParticipReport);

            return new ReportsListDto
            {
                Items = testResults,
                TotalCount = total_count
            };
        }

        private IQueryable<RsurTestResult> FilterTestResults(IQueryable<RsurTestResult> queryable, ReportsListOptions options)
        {
            if (!String.IsNullOrEmpty(options.Search))
            {
                queryable = queryable.Where(rtr => rtr.RsurParticipTest.RsurParticip.Code.ToString().Contains(options.Search)
                                                || rtr.RsurParticipTest.RsurParticip.Name.Contains(options.Search)
                                                || rtr.RsurParticipTest.RsurParticip.Surname.Contains(options.Search));
            }

            if (!String.IsNullOrEmpty(options.SchoolId))
            {
                queryable = queryable.Where(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId.Contains(options.SchoolId));
            }

            if (!String.IsNullOrEmpty(options.TestCode))
            {
                queryable = queryable.Where(rtr => rtr.RsurParticipTest.RsurTest.Test.NumberCode.Trim().Contains(options.TestCode));
            }

            if (!String.IsNullOrEmpty(options.ExamCode))
            {
                queryable = queryable.Where(rtr => rtr.RsurParticipTest.RsurTest.ExamCode.Trim().Contains(options.ExamCode));
            }

            return queryable;
        }

        private IQueryable<RsurTestResult> SortTestResults(IQueryable<RsurTestResult> queryable)
        {
            return queryable.OrderBy(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId)
                            .ThenByDescending(rtr => rtr.Grade5)
                            .ThenBy(rtr => rtr.RsurParticipTest.RsurParticip.Surname)
                            .ThenBy(rtr => rtr.RsurParticipTest.RsurParticip.Name);
        }

        private ParticipReport MapParticipReport(RsurTestResult rtr)
        {
            return new ParticipReport
            {
                ParticipCode = rtr.RsurParticipTest.RsurParticip.Code,
                TestStatus = ConvertGrade5ToTestStatus(rtr.Grade5),
                TestName = $"{rtr.RsurParticipTest.RsurTest.Test.NumberCode} — {rtr.RsurParticipTest.RsurTest.Test.Name}",
                ExamName = rtr.RsurParticipTest.RsurTest.ExamName,
                RsurParticipTestId = rtr.RsurParticipTestId,
                SchoolParticipInfo = new SchoolParticip
                {
                    Surname = rtr.RsurParticipTest.RsurParticip.Surname,
                    Name = rtr.RsurParticipTest.RsurParticip.Name,
                    SecondName = rtr.RsurParticipTest.RsurParticip.SecondName,
                    SchoolName = rtr.RsurParticipTest.RsurParticip.School.Id + " — " + rtr.RsurParticipTest.RsurParticip.School.Name.Trim()
                }
            };
        }

        private string ConvertGrade5ToTestStatus(int? Grade5)
        {
            if (Grade5 == null)
            {
                return "ОТСУТСТВОВАЛ";
            }
            else if (Grade5 < 5)
            {
                return "НЕЗАЧЕТ";
            }
            else if (Grade5 == 5)
            {
                return "ЗАЧЕТ";
            }
            else
            {
                throw new ArgumentException($@"Value of parameter {nameof(Grade5)} is '{Grade5}', but has to be: null, 2 or 5");
            }           
        }

        private IEnumerable<string> GetSchoolNames(IQueryable<RsurTestResult> entities)
        {
            var schools = entities.Select(s => s.RsurParticipTest.RsurParticip.School).Distinct();
            var orderedSchools = schools.OrderBy(ob => ob.Id);
            return orderedSchools.AsEnumerable().Select(s => $"{s.Id} - {s.Name.Trim()}").Distinct();
        }

        private IEnumerable<string> GetTestNames(IQueryable<RsurTestResult> entities)
        {
            var tests = entities.Select(s => s.RsurParticipTest.RsurTest.Test).Distinct();
            var orderedTests = tests.OrderBy(ob => ob.NumberCode);
            return orderedTests.AsEnumerable().Select(s => $"{s.NumberCode} - {s.Name.Trim()}").Distinct();
        }

        #endregion
    }
}



/// <summary>
/// Создание записи для таблицы «Выполнение заданий КИМ ЕГЭ» в отчете «Карта учителя»
/// </summary>
/// <param name="test">Блок РСУР</param>
/// <param name="egeQuestionValues">
/// <example><example>{"2(40%);5(0%);8(0%)", "2(70%);5(75%);8(57%)"}</example></example>
/// </param>
/// <returns></returns>
//private IEnumerable<EgeQuestionResult> GetEgeQuestionResults(Test test, string egeQuestionValues)
//{
//    //if (test == null || test.TestQuestions.All(x => !x.RsurEgeQuestions.Any())) // only new model has RsurEgeQuestions            
//    //    throw new ArgumentException(nameof(test));            

//    //if (string.IsNullOrWhiteSpace(egeQuestionValues))
//    //    throw new ArgumentException($"{nameof(egeQuestionValues)} is null or empty");

//    //var egeQuestionValuesArray = egeQuestionValues.Split(';');
//    //if (!egeQuestionValuesArray.Any())
//    //    throw new ArgumentException(nameof(egeQuestionValues));

//    //var egeQuestionResults = new List<EgeQuestionResult>();
//    //foreach (var egeQuestionValueString in egeQuestionValuesArray)
//    //{
//    //    // Get egeQuestionNumber from egeQuestionValueString = "2(70%)" (e.g.) 
//    //    var egeQuestionNumber = int.Parse(Regex.Match(egeQuestionValueString, @"\d+(?=\()").Value); // '(?=\()' - искоючить из результата открывающую скобку                

//    //    var egeQuestionResult = new EgeQuestionResult
//    //    {
//    //        EgeQuestionNumber = egeQuestionNumber,
//    //        Value = double.Parse(Regex.Match(egeQuestionValueString, @"\d+\.*\d*(?=%)").Value.Replace('.', ',')) // get egeQuestionValue from egeQuestionValueString = "2(70%)" (e.g.) 
//    //    };

//    //    // Получение заданий КИМ РСУР, которые проверяют задание КИМ ЕГЭ (egeQuestionNumber) 
//    //    var testQuestions = test.TestQuestions.Where(tq => tq.RsurEgeQuestions.Any(req => req.EgeQuestionOrder == egeQuestionNumber)).ToList();

//    //    egeQuestionResult.RsurQuestionNumbers = testQuestions.Select(tq => tq.Name).Aggregate((s1, s2) => $"{s1};{s2}");
//    //    egeQuestionResult.ElementNames = testQuestions.First().Question.ElementNames;

//    //    egeQuestionResults.Add(egeQuestionResult);
//    //}

//    //return egeQuestionResults;
//    return null;
//}