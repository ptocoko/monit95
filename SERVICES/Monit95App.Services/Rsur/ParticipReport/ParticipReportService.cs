using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Validation;

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

            serviceResult.Result.FullParticipName = $"{entity.RsurParticipTest.RsurParticip.Surname.ToUpper()} {entity.RsurParticipTest.RsurParticip.Name.ToUpper()} {entity.RsurParticipTest.RsurParticip.SecondName.ToUpper()}";
            serviceResult.Result.SchoolParticipInfo = new SchoolParticip
            {                
                SchoolName = entity.RsurParticipTest.RsurParticip.School.Name
            };

            serviceResult.Result.ParticipCode = entity.RsurParticipTest.RsurParticipCode;
            serviceResult.Result.TestStatus = entity.Grade5 == 2 ? "НЕЗАЧЕТ" : "ЗАЧЕТ";
            serviceResult.Result.TestDateString = entity.RsurParticipTest.RsurTest.TestDate.ToShortDateString();
            serviceResult.Result.TestName = $"{entity.RsurParticipTest.RsurTest.Test.NumberCode} — {entity.RsurParticipTest.RsurTest.Test.Name}";

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
                    Value = double.Parse(Regex.Match(egeQuestionValueString, @"\d+\.*\d*(?=%)").Value.Replace('.', ',')) // get egeQuestionValue from egeQuestionValueString = "2(70%)" (e.g.) 
                };

                // Получение заданий КИМ РСУР, которые проверяют номер egeQuestionNumber задание КИМ ЕГЭ
                var rsurQuestions = entity.RsurParticipTest.RsurTest.Test.RsurQuestions.Where(rq => rq.EgeQuestion.Order == egeQuestionNumber);
                egeQuestionResult.RsurQuestionNumbers = rsurQuestions.Select(rq => rq.Order.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");

                // ElementNames
                egeQuestionResult.ElementNames = rsurQuestions.First().EgeQuestion.ElementNames;                

                serviceResult.Result.EgeQuestionResults.Add(egeQuestionResult);
            }            

            return serviceResult;
        }

        #region Private methods

        

        private string ConvertGrade5ToTestStatus(int? Grade5)
        {
            switch(Grade5)
            {
                case null:
                    return "ОТСУТСТВОВАЛ";                    
                case 2:
                    return "НЕЗАЧЕТ";                    
                case 5:
                    return "ЗАЧЕТ";                    
                default:
                    throw new ArgumentException($@"Value of parameter {nameof(Grade5)} is '{Grade5}', but has to be: null, 2 or 5");
            }            
        }

        /// <summary>
        /// Завершает формирование запроса на получение отчетов и выполняет его
        /// </summary>
        /// <param name="queryable"></param>
        /// <param name="testDate"></param>
        /// <returns></returns>        
        private IEnumerable<ParticipReport> GetResults(IQueryable<RsurTestResult> queryable)
        {            
            var minDateTime = new DateTime(2017, 10, 11);

            // TODO: Разница между AsEnumerable vs IQuerably and Linq Entities vs Linq to Object
            var testResults = queryable.Where(rtr => rtr.RsurParticipTest.RsurTest.TestDate >= minDateTime   // начало с октября                              
                                                  && rtr.RsurParticipTest.RsurParticip.ActualCode == 1)      // только актуальных участников   
                                       .AsEnumerable()      
                                       .Select(rtr => new ParticipReport
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
                                           },
                                       })
                                       .OrderBy(pr => pr.SchoolParticipInfo.SchoolName)
                                       .ThenBy(pr => pr.TestStatus)
                                       .ThenBy(pr => pr.SchoolParticipInfo.Surname)
                                       .ThenBy(pr => pr.SchoolParticipInfo.Name);

            return testResults.ToList();
        }

        #endregion

        /// <summary>
        /// Получает список отчетов участников для МУНИЦИПАЛИТЕТА
        /// </summary>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public ServiceResult<IEnumerable<ParticipReport>> GetReportsForArea(int areaCode)
        {
            var serviceResult = new ServiceResult<IEnumerable<ParticipReport>>();
            
            var areaResults = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode); // начало формирование запроса: фильтр по муниципалитету
            serviceResult.Result = GetResults(areaResults); // отправляем запрос методу для дальнейшего формирования и выполнения

            if (!serviceResult.Result.Any()) // если список отчетов пуст            
                serviceResult.Errors.Add(new ServiceError { Description = $"Возможно указан неверный код муниципалитета: {nameof(areaCode)}: '{areaCode}'" });            

            return serviceResult;
        }

        /// <summary>
        /// Получает список отчетов участников для ШКОЛЫ
        /// </summary>
        /// <param name="schoolId"></param>
        /// <returns></returns>
        public ServiceResult<IEnumerable<ParticipReport>> GetReportsForSchool(string schoolId)
        {
            var serviceResult = new ServiceResult<IEnumerable<ParticipReport>>();

            var areaResults = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.SchoolId == schoolId); // начало формирование запроса: фильтр по муниципалитету
            serviceResult.Result = GetResults(areaResults); // отправляем запрос методу для дальнейшего формирования и выполнения

            if (!serviceResult.Result.Any())
                serviceResult.Errors.Add(new ServiceError { Description = $"Возможно указан неверный код школы: {nameof(schoolId)}: '{schoolId}'" });

            return serviceResult;
        }
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