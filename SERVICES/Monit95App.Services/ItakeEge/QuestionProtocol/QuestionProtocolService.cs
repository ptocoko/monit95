using System.Collections.Generic;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System.Linq;
using System.Collections.ObjectModel;
using ServiceResult.Exceptions;
using Monit95App.Services.ItakeEge.QuestionProtocol;

namespace Monit95App.Services.ItakeEge.QuestionResult
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

                foreach (var qm in entity.QuestionMarks.OrderBy(qm => qm.Question.Order))
                {
                    questionMarksString += qm.AwardedMark.ToString();
                }

                readDto.QuestionMarks = questionMarksString;

                readDtoCollection.Add(readDto);
            }

            return readDtoCollection;
                                                       
        }

        /// <summary>
        /// Получение протокола проверки заданий для редактирования
        /// </summary>
        /// <param name="schoolId"></param>
        /// <returns></returns>
        /// TODO: ref
        public QuestionProtocolEditDto GetEditDto(string schoolId, int participTestId)
        {
            var participTestEntity = cokoContext.ParticipTests.AsNoTracking().SingleOrDefault(pt => pt.ProjectTest.IsOpen &&
                                                                                                    pt.Particip.SchoolId == schoolId &&
                                                                                                    pt.ParticipId == participTestId);
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




        public void Create(string schoolId, int participTestId, IEnumerable<QuestionMarkPostDto> postDtos)
        {
            var participTestEntity = cokoContext.ParticipTests.AsNoTracking().SingleOrDefault(pt => pt.Particip.SchoolId == schoolId &&
                                                                                                    pt.Id == participTestId);
            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException();

        }

        #endregion
    }
}
