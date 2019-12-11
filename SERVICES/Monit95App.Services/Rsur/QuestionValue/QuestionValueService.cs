// --------------------------------------------------------------------------------------------------------------------
// <copyright company="Center for Evaluation of the Quality of Education" file="RsurTestResultService.cs">
//   Copyright (c) CEQE.  All rights reserved.
// </copyright>
// <summary>
//   
// </summary>
// --------------------------------------------------------------------------------------------------------------------

// ReSharper disable StringIndexOfIsCultureSpecific.1

using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.TestResult;
using ServiceResult;

namespace Monit95App.Services.Rsur.QuestionValue
{
    /// <summary>
    /// Provides the APIs for managing test's results in a persistence store.
    /// </summary>
    public class QuestionValueService : IQuestionValueService
    { 
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        #region All Constructors

        public QuestionValueService(CokoContext context)
        {
            this.context = context;
        }

        #endregion

        #region Methods                

        /// <summary>
        /// Вычисление процента заполнения протоколов проверки заданий.
        /// </summary>
        /// <remarks>
        /// Вычисляет процент заполнения протоколов проверки заданий для указанного пользователя для открытых тестов.
        /// </remarks>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public ServiceResult<int> GetStatistics(int areaCode)
        {
            var result = new ServiceResult<int>();   
            
            var participTests = context.RsurParticipTests.Where(rpt => rpt.RsurTest.IsOpen && rpt.Editable);
            if (areaCode != 200)
                participTests = participTests.Where(rpt => rpt.RsurParticip.School.AreaCode == areaCode);

            if (!participTests.Any())
                result.Errors.Add(new ServiceError { HttpCode = 404, Description = $@"Нет открытых тестов для указанного пользователя '{areaCode}'"});

            // Получаем кол-во участников распределенных на диагностику
            var participTestCount = participTests.Count();

            // Получаем кол-во участников у которых занесены баллы по заданиям или поставленно «отсутствовал»
            var testResultsCount = participTests.Count(rpt => rpt.RsurTestResult != null);
            result.Result = (int)(testResultsCount * 1.0 / participTestCount * 1.0 * 100);
            return result;
        }

        /// <summary>
        /// Получения протокола проверки заданий участника для редактирования
        /// </summary>
        /// <param name="participCode"></param>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public QuestionValueEditDto Get(int participCode, int areaCode)
        {
            if (!Enumerable.Range(10000, 99999).Contains(participCode)
                || !Enumerable.Range(200, 217).Contains(areaCode))
            {
                throw new ArgumentException($"{nameof(participCode)} has to be 10000-99999 and {nameof(areaCode)} has to be 200-217");
            } 
            
            var rsurParticipTest = this.context.RsurParticipTests.SingleOrDefault(x => x.RsurParticipCode == participCode
                                                                                    && x.RsurTest.IsOpen
                                                                                    && x.Editable);
            if (areaCode != 200)
                rsurParticipTest = rsurParticipTest.RsurParticip.School.AreaCode == areaCode ? rsurParticipTest : null;

            if (rsurParticipTest == null)
            {
                throw new ArgumentException($"{nameof(participCode)} is incorrect or is not access for current user");
            }

            var marksProtocol = new QuestionValueEditDto
            {
                ParticipCode = rsurParticipTest.RsurParticipCode,
                ParticipTestId = rsurParticipTest.Id,
                TestName = $"{rsurParticipTest.RsurTest.Test.NumberCode}-{rsurParticipTest.RsurTest.Test.Name}"
            };
            
            string[] currentMarks = null;
            if(rsurParticipTest.RsurTestResult != null && rsurParticipTest.RsurTestResult.RsurQuestionValues != "wasnot")
            {
                currentMarks = rsurParticipTest.RsurTestResult.RsurQuestionValues.Split(';');
            } 
            var testQuestions = rsurParticipTest.RsurTest.Test.Questions.ToList();
            int index = 0;
            marksProtocol.QuestionResults = new List<QuestionResult>();
            foreach (var question in testQuestions.OrderBy(x => x.Order))
            {
                marksProtocol.QuestionResults.Add(new QuestionResult
                {
                    Order = question.Order,
                    Name = question.Order.ToString(),
                    MaxMark = question.MaxMark,
                    CurrentMark = currentMarks != null ? (int?)int.Parse(currentMarks[index]) : null
                });
                index++;
            }
                        
            return marksProtocol;            
        }

        /// <summary>
        /// Получение протокола проверки заданий по fileId файла бланка ответов
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        [SuppressMessage("ReSharper", "SuggestVarOrType_BuiltInTypes")]
        public ServiceResult<QuestionValueEditDto> GetEditDtoByFileId(int fileId, int areaCode)
        {
            var result = new ServiceResult<QuestionValueEditDto>();        

            // Нам необходимо значение поля RsurTestResult.RsurQuestionValues и для этого попытаемся
            // получить соответствующий объект RsurTestResult если такой существует.
            var rsurTestResult = context.RsurTestResults.SingleOrDefault(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode 
                                                                             && rtr.RsurParticipTest.RsurTest.IsOpen
                                                                             && rtr.FileId == fileId);

            // Проверяем был ли объект RsurTestResult для данного fileId
            if (rsurTestResult == null)
            {
                // Если соответствующего объекта RsurTestResult нет, то это не ошибка/исключение.
                // Просто возвращаем результат с Result = null
                return result;
            }
     
            // Создаем объект editDto и частично инициализируем его
            var questionValueEditDto = new QuestionValueEditDto
            {
                ParticipCode = rsurTestResult.RsurParticipTest.RsurParticipCode,
                ParticipTestId = rsurTestResult.RsurParticipTestId,
                TestName = $"{rsurTestResult.RsurParticipTest.RsurTest.Test.NumberCode}-{rsurTestResult.RsurParticipTest.RsurTest.Test.Name}"
            };

            // Осталось инициализировать QuestionResults.
            var currentMarks = rsurTestResult.RsurQuestionValues.Split(';'); // if RsurTestResults.FileId != null, then RsurtTesResults.RsurQuestionValues != "wasnot"                        
            var testQuestions = rsurTestResult.RsurParticipTest.RsurTest.Test.Questions; // получаем задания текущего блока. Они необходимы, чтобы знать максимальный балл по заданиям
            int index = 0;         
            foreach (var testQuestion in testQuestions.OrderBy(tq => tq.Order))
            {
                questionValueEditDto.QuestionResults.Add(new QuestionResult
                {
                    Order = testQuestion.Order,                    
                    MaxMark = 1,
                    CurrentMark = int.Parse(currentMarks[index]) // currentValues[0] - балл за первое задание и т.д.
                });
                index++;
            }

            // Возвращаем результат
            result.Result = questionValueEditDto;
            return result;
        }

        /// <summary>
        /// Добавляет/редактирует баллы по заданиям 
        /// </summary>
        /// <param name="questionValueEditDto"></param>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public VoidResult CreateOrUpdate(QuestionValueEditDto questionValueEditDto, int areaCode)
        {
            var result = new VoidResult();
            
            // Получаем testQuestions
            if (questionValueEditDto == null)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(questionValueEditDto)} is null" });
                return result;
            }

            if(questionValueEditDto.QuestionResults == null)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(questionValueEditDto.QuestionResults)} is null" });
                return result;
            }

            var participTest = context.RsurParticipTests
                .SingleOrDefault(x => x.RsurTest.IsOpen
                                   && x.Id == questionValueEditDto.ParticipTestId
                                   && x.Editable);
            if (areaCode != 200)
                participTest = participTest.RsurParticip.School.AreaCode == areaCode ? participTest : null;

            if (participTest == null)
            {
                result.Errors.Add(new ServiceError {                    
                    Description = "- RsurTest is not open;" +
                                 $" - Or {nameof(questionValueEditDto.ParticipTestId)} or {nameof(areaCode)} is incorrect;" +
                                  " - Or participTest is not Editable;" +
                                  " - Or user has not access to this entity"
                });                
                return result;
            }

            var testQuestions = participTest.RsurTest.Test.Questions;
            
            // Сравниваем количество заданий
            if (testQuestions.Count != questionValueEditDto.QuestionResults.Count())
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(testQuestions)} count != {nameof(questionValueEditDto.QuestionResults)}" });                
                return result;
            }            
            
            questionValueEditDto.QuestionResults.ForEach(questionResult =>
            {
                var maxValue = questionResult.MaxMark;

                // если балл указан балл ниже -1 (отсутствовал) или больше допустимого, то устанавливается максимально допустимый
                if (questionResult.CurrentMark < -1 || questionResult.CurrentMark > maxValue)
                {
                    questionResult.CurrentMark = maxValue;
                } 
            });
            var rsurQuestionValues = questionValueEditDto.QuestionResults.Select(s => s.CurrentMark.ToString()).Aggregate((totalCurrentMarks, nextCurrentMark) => $"{totalCurrentMarks};{nextCurrentMark}");

            // если хотя бы у обного задание в качестве значения (балл за задание) стоит -1, 
            // то считается что данный участник отсутствовал на диагностике (wasnot)
            if (rsurQuestionValues.IndexOf("-1") > -1)
            {
                rsurQuestionValues = "wasnot";
            }
                
            var rsurTestResult = context.RsurTestResults.Find(questionValueEditDto.ParticipTestId);

            // create
            if (rsurTestResult == null) 
            {
                this.context.RsurTestResults.Add(new RsurTestResult
                {
                    RsurParticipTestId = questionValueEditDto.ParticipTestId,
                    FileId = questionValueEditDto.FileId,
                    RsurQuestionValues = rsurQuestionValues                    
                });
            }            
            else
            {
                // edit
                rsurTestResult.RsurQuestionValues = rsurQuestionValues;
                rsurTestResult.FileId = questionValueEditDto.FileId;
            }

            context.SaveChanges();
            return result;
        }        

        public ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolList(int areaCode)
        {
            var result = new ServiceResult<IEnumerable<QuestionValueViewDto>>();

            var entities = context.RsurParticipTests.Where(x => x.RsurTest.IsOpen
                                                             && x.Editable);
            if (areaCode != 200)
                entities = entities.Where(p => p.RsurParticip.School.AreaCode == areaCode);

            if (!entities.Any())
            {
                result.Errors.Add(new ServiceError { HttpCode = 404 });
                return result;
            }


            result.Result = entities.Select(s => new QuestionValueViewDto
            {
                ParticipCode = s.RsurParticipCode,
                ParticipTestId = s.Id,
                RsurQuestionValues = s.RsurTestResult.RsurQuestionValues,
                TestName = s.RsurTest.Test.NumberCode + "-" + s.RsurTest.Test.Name
            })
            .ToList()
            .OrderBy(ob => ob.RsurQuestionValues, Comparer<string>.Create((str1, str2) =>
            {
                if(str1 == null && str2 != null)
                {
                    return -1;
                }
                else if(str1 != null && str2 == null)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            })).ThenBy(tb => tb.ParticipCode);

            return result;
        }

        public VoidResult MarkAsAbsent(int participTestId, int areaCode)
        {
            var result = new VoidResult();

            if(!context.RsurParticipTests.Any(p => areaCode == 200 ? true : p.RsurParticip.School.AreaCode == areaCode 
                                                && p.Id == participTestId 
                                                && p.Editable))
            {
                result.Errors.Add(new ServiceError { HttpCode = 404, Description = $"{nameof(participTestId)} which equals {participTestId} not exist in current area" });
                return result;
            }

            var participResult = context.RsurTestResults.SingleOrDefault(s => s.RsurParticipTestId == participTestId);

            if (participResult == null)
            {
                participResult = new RsurTestResult
                {
                    RsurParticipTestId = participTestId,
                    RsurQuestionValues = "wasnot"
                };
                context.RsurTestResults.Add(participResult);
                context.SaveChanges();

                return result;
            }

            participResult.RsurQuestionValues = "wasnot";
            context.SaveChanges();

            return result;
        }

        #endregion
    }
}