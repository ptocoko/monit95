using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Enums;
using Monit95App.Services.ItakeEge.QuestionResult;
using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using ServiceResult.Exceptions;

namespace Monit95App.Services.ItakeEge.QuestionProtocol
{
    public class QuestionProtocolService : IQuestionProtocolService
    {
        #region Dependencies

        private readonly CokoContext cokoContext;

        #endregion

        #region Constructors

        public QuestionProtocolService(CokoContext cokoContext)
        {
            this.cokoContext = cokoContext;
        }

        #endregion

        #region Service methods        

        /// <summary>
        /// Получение протоколов проверки заданий
        /// </summary>
        /// <param name="schoolId"></param>
        /// <returns></returns>
        /// TODO: ref
        public IEnumerable<QuestionProtocolReadDto> GetReadDtos(string schoolId)
        {
            var participTestEntities = cokoContext.ParticipTests.AsNoTracking().Where(pt => pt.ProjectTest.IsOpen && pt.Particip.SchoolId == schoolId).ToList();
            var readDtoCollection = new Collection<QuestionProtocolReadDto>();
            foreach (var entity in participTestEntities)
            {
                var readDto = new QuestionProtocolReadDto
                {
                    ParticipTestId = entity.Id,
                    ParticipInfo = $"{entity.Particip.Surname} {entity.Particip.Name} {entity.Particip.SecondName}"
                };

                string questionMarksString = null;

                // если Grade5 = -1 значит участник отсутствовал
                if(entity.Grade5 < 0)
                {
                    questionMarksString = "отсутствовал";
                }
                else
                {
                    StringBuilder strBuilder = new StringBuilder();
                    foreach (var qm in entity.QuestionMarks.OrderBy(qm => qm.Question.Order))
                    {
                        strBuilder.Append(qm.AwardedMark.ToString() + ";");
                    }
                    // убираем последний символ точки с запятой: 1;0;1;0;1;0';'
                    if (strBuilder.Length > 1)
                    {
                        strBuilder.Length = strBuilder.Length - 1;
                        questionMarksString = strBuilder.ToString();
                    }
                }

                readDto.QuestionMarks = questionMarksString;

                readDtoCollection.Add(readDto);
            }

            return readDtoCollection.OrderBy(qp => qp.ParticipInfo);
        }

        /// <summary>
        /// Получение протокола проверки заданий для редактирования
        /// </summary>
        /// <param name="schoolId"></param>
        /// <param name="participTestId"></param>
        /// <returns></returns>
        /// TODO: ref
        public QuestionProtocolEditDto GetEditDto(string schoolId, int participTestId)
        {
            var participTestEntity = cokoContext.ParticipTests.AsNoTracking().SingleOrDefault(pt => pt.ProjectTest.IsOpen &&
                                                                                                    pt.Particip.SchoolId == schoolId &&
                                                                                                    pt.Id == participTestId);
            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException();

            var editDto = new QuestionProtocolEditDto
            {
                ParticipInfo = $"{participTestEntity.Particip.Surname} {participTestEntity.Particip.Name} {participTestEntity.Particip.SecondName}"
            };

            // Если протокол ПУСТ
            if (!participTestEntity.QuestionMarks.Any())
            {
                foreach(var question in participTestEntity.ProjectTest.Test.Questions)
                {
                    editDto.MarkCollection.Add(new QuestionMarkEditModel
                    {
                        Order = question.Order,                        
                        MaxMark = question.MaxMark                        
                    });
                }
            }
            else
            {
                foreach (var questionMark in participTestEntity.QuestionMarks)
                {
                    editDto.MarkCollection.Add(new QuestionMarkEditModel
                    {
                        Order = questionMark.Question.Order,
                        AwardedMark = questionMark.AwardedMark,
                        MaxMark = questionMark.Question.MaxMark,
                        QuestionMarkId = questionMark.Id
                    });
                }
            }
                        
            return editDto;
        }

        /// <summary>
        /// Создание протокола проверки заданий
        /// </summary>
        /// <param name="schoolId"></param>
        /// <param name="participTestId"></param>
        /// <param name="postDtos"></param>
        /// TODO: ref
        public void Create(string schoolId, int participTestId, Dictionary<int, double> orderMarkDict)
        {            
            var participTestEntity = cokoContext.ParticipTests.SingleOrDefault(pt => pt.Particip.SchoolId == schoolId &&
                                                                                                    pt.Id == participTestId);
            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException();

            // очищаем вычисленные значения для старых marks
            if(participTestEntity.Grade5 != null || participTestEntity.PrimaryMark != null)
            {
                participTestEntity.Grade5 = null;
                participTestEntity.PrimaryMark = null;
            }

            // Get test questions
            var testQuestionDict = participTestEntity.ProjectTest.Test.Questions.ToDictionary(q => q.Order);
            var resultQuestionMarks = new List<QuestionMark>();

            foreach (var orderAndQuestion in testQuestionDict)
            {
                var newQuestionMark = new QuestionMark
                {
                    Question = orderAndQuestion.Value
                };

                var awardedValue = orderMarkDict[orderAndQuestion.Key];
                var possibleMaxMark = orderAndQuestion.Value.MaxMark;

                if (awardedValue > possibleMaxMark)
                    newQuestionMark.AwardedMark = possibleMaxMark;
                else
                    newQuestionMark.AwardedMark = awardedValue;
                resultQuestionMarks.Add(newQuestionMark);
            }

            // перед добавлением новых marks в базу избавляемся от старых
            if (participTestEntity.QuestionMarks.Any())
            {
                cokoContext.QuestionMarks.RemoveRange(participTestEntity.QuestionMarks);
            }
            participTestEntity.QuestionMarks = resultQuestionMarks;

            cokoContext.SaveChanges();
        }

        /// <summary>
        /// Отметка, что участники отсутствовал
        /// </summary>
        /// <param name="schoolId"></param>
        /// <param name="participTestId"></param>
        /// TODO: ref
        public void MarkAsWasNot(string schoolId, int participTestId)
        {
            var participTestEntity = cokoContext.ParticipTests.Single(pt => pt.Particip.SchoolId == schoolId && pt.Id == participTestId);
            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException();
            cokoContext.QuestionMarks.RemoveRange(participTestEntity.QuestionMarks);
            participTestEntity.Grade5 = (int)Grade5Value.Absent; // отсутствовал
            cokoContext.SaveChanges();            
        }

        #endregion
    }
}
