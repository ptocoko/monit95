using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.SchoolsProfile
{
    public class SchoolsProfileService
    {
        private readonly CokoContext context;

        public SchoolsProfileService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<IEnumerable<ProfileQuestionDto>> GetProfileQuestions(string schoolId)
        {
            var question = context.ProfileQuestions.ToList().Select(s =>
            {
                var res = new ProfileQuestionDto
                {
                    Body = s.Body,
                    Description = s.Description,
                    HasSessions = s.HasSessions,
                    Order = s.Order,
                    IsBooleanAnswer = s.IsBooleanAnswer,
                    MaxValue = s.MaxValue
                };

                if (s.HasSessions)
                {
                    res.SessionValues = new Dictionary<string, int?>
                    {
                        ["2016-2017"] = s.ProfileQuestionAnswers?.SingleOrDefault(p => p.SchoolId == schoolId && p.Session == "2016-2017").Value,
                        ["2017-2018"] = s.ProfileQuestionAnswers?.SingleOrDefault(p => p.SchoolId == schoolId && p.Session == "2017-2018").Value,
                        ["2018-2019"] = s.ProfileQuestionAnswers?.SingleOrDefault(p => p.SchoolId == schoolId && p.Session == "2018-2019").Value
                    };
                }
                else
                {
                    res.Value = s.ProfileQuestionAnswers.SingleOrDefault(p => p.SchoolId == schoolId).Value;
                }
                return res;
            });

            return new IEnumerable<ProfileQuestionDto>[]
            {
                question.Where(p => !p.IsBooleanAnswer).OrderBy(ob => ob.Order),
                question.Where(p => p.IsBooleanAnswer).OrderBy(ob => ob.Order)
            };
        }
    }
}
