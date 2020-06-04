using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class QuestionProtocolService : IQuestionProtocolService
    {
        private readonly CokoContext context;
        private readonly int _projectId = 31;

        public QuestionProtocolService(CokoContext context)
        {
            this.context = context;
        }

        public void EditQuestionMarks(int participTestId, string schoolId, QuestionProtocolDto protocolDto)
        {
            if (!protocolDto.OptionNumber.HasValue)
                throw new ArgumentException("OptionNumber is required");

            CheckPostedQuestionMarks(protocolDto.QuestionMarks);

            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            var (countOfPassedGeneralQuestions, percentOfNonGeneralQuestionMarks) = GetParticipResults(participTest.ProjectTest.Test.OneTwoThreeQuestions.AsEnumerable(), protocolDto);

            (participTest.Grade5, participTest.GradeString) = GetGrades(countOfPassedGeneralQuestions, percentOfNonGeneralQuestionMarks, _marksCountsByProjectId[participTest.ProjectTestId]);
            // TODO: Solve Grade5!
            //participTest.Grade5 = null;
            participTest.OptionNumber = protocolDto.OptionNumber;

            context.OneTwoThreeQuestionMarks.AddRange(protocolDto.QuestionMarks.Select(s => new OneTwoThreeQuestionMark
            {
                ParticipTestId = participTestId,
                AwardedMark = s.CurrentMark.Value,
                OneTwoThreeQuestionId = s.QuestionId
            }));

            context.SaveChanges();
        }

        public QuestionProtocolDto GetProtocol(int participTestId, string schoolId)
        {
            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            IEnumerable<QuestionMarkDto> questionMarks;
            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                questionMarks = participTest.OneTwoThreeQuestionMarks.Select(s => new QuestionMarkDto
                {
                    QuestionId = s.OneTwoThreeQuestionId,
                    MaxMark = s.OneTwoThreeQuestion.MaxMark,
                    CurrentMark = s.AwardedMark,
                    Name = s.OneTwoThreeQuestion.Name,
                    Number = s.OneTwoThreeQuestion.Number
                });
            }
            else
            {
                questionMarks = participTest.ProjectTest.Test.OneTwoThreeQuestions.Select(s => new QuestionMarkDto
                {
                    QuestionId = s.Id,
                    MaxMark = s.MaxMark,
                    Name = s.Name,
                    Number = s.Number
                });
            }

            return new QuestionProtocolDto
            {
                ParticipFIO = $"{participTest.Particip.Surname} {participTest.Particip.Name} {participTest.Particip.SecondName}",
                TestName = participTest.ProjectTest.Test.Name,
                OptionNumber = participTest.OptionNumber,
                QuestionMarks = questionMarks
            };
        }

        public IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId, int projectTestId)
        {
            var participTests = context.ParticipTests
                .AsNoTracking()
                .Where(p => p.Particip.SchoolId == schoolId && p.ProjectTest.ProjectId == _projectId && p.ProjectTestId == projectTestId && p.ProjectTest.IsOpen)
                .Include(inc => inc.OneTwoThreeQuestionMarks)
                .Include(inc => inc.Particip)
                .Include(inc => inc.Particip.Class);

            var questionList = new List<QuestionListDto>();
            foreach (var participTest in participTests)
            {
                questionList.Add(new QuestionListDto
                {
                    ParticipTestId = participTest.Id,
                    ParticipId = participTest.ParticipId,
                    ParticipFIO = participTest.Particip.Surname + " " + participTest.Particip.Name + " " + participTest.Particip.SecondName,
                    ClassId = participTest.Particip.ClassId,
                    ClassName = participTest.Particip.Class.Name.Trim(),
                    Marks = GetMarks(participTest)
                });
            }

            return questionList.OrderBy(ob => ob.ClassId).ThenBy(tb => tb.ParticipFIO);
        }

        public void MarkAsAbsent(int participTestId, string schoolId)
        {
            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            participTest.Grade5 = -1;
            participTest.OptionNumber = null;
            participTest.GradeString = null;

            context.SaveChanges();
        }

        private (int, decimal) GetParticipResults(IEnumerable<OneTwoThreeQuestion> questions, QuestionProtocolDto protocolDto)
        {
            var questionMarks = protocolDto.QuestionMarks;
            var generalQuestionIds = questions.Where(q => q.IsGeneralPart).Select(q => q.Id);

            var generalQuestionMarks = questionMarks.Where(qm => generalQuestionIds.Contains(qm.QuestionId));
            var nonGeneralQuestionMarks = questionMarks.Where(qm => !generalQuestionIds.Contains(qm.QuestionId));

            var countOfPassedGeneralQuestions = generalQuestionMarks.GroupBy(qm => qm.Number).Select(gqm => gqm.Select(qm => qm.CurrentMark).Sum()).Count(cm => cm > 0);
            var percentOfNonGeneralQuestionMarks = ((decimal)nonGeneralQuestionMarks.Sum(qm => qm.CurrentMark) * 100) / (decimal)nonGeneralQuestionMarks.Sum(qm => qm.MaxMark);

            return (countOfPassedGeneralQuestions, percentOfNonGeneralQuestionMarks);
        }

        private (int, string) GetGrades(int countOfPassedGeneralQuestions, decimal percentOfNonGeneralQuestionMarks, GradesOptions marksCountLevels)
        {
            if (countOfPassedGeneralQuestions < marksCountLevels.MinCountForThree)
            {
                return (2, marksCountLevels.TwoGradeStr);
            }
            else if (countOfPassedGeneralQuestions >= marksCountLevels.MinCountForThree && countOfPassedGeneralQuestions <= marksCountLevels.MaxCountForThree)
            {
                return (3, marksCountLevels.ThreeGradeStr);
            }
            else if (countOfPassedGeneralQuestions >= marksCountLevels.MinCountForFour && countOfPassedGeneralQuestions <= marksCountLevels.MaxCountForFour)
            {
                if (countOfPassedGeneralQuestions >= marksCountLevels.MaxCountForFour && percentOfNonGeneralQuestionMarks > marksCountLevels.MinPercentToPassNonGeneralPart)
                {
                    return (5, marksCountLevels.FiveGradeStr);
                }
                return (4, marksCountLevels.FourGradeStr);
            }
            //else if (countOfPassedGeneralQuestions > marksCountLevels.MaxCountForFour && percentOfNonGeneralQuestionMarks > marksCountLevels.MinPercentToPassNonGeneralPart)
            //{
            //    return (5, marksCountLevels.FiveGradeStr);
            //}
            //else if (countOfPassedGeneralQuestions > marksCountLevels.MaxCountForFour)
            //{
            //    return (4, marksCountLevels.FourGradeStr);
            //}
            else
            {
                throw new ArgumentException("something wrong with grade solver");
            }
        }

        private void CheckPostedQuestionMarks(IEnumerable<QuestionMarkDto> questionMarks)
        {
            if(questionMarks.Any(p => p.CurrentMark == null))
            {
                throw new ArgumentException("Posted CurrentMarks cannot be null");
            }

            if(questionMarks.Any(p => p.CurrentMark > p.MaxMark))
            {
                throw new ArgumentException("CurrentMarks should be less or equal to MaxMark");
            }

            if(questionMarks.Any(p => p.CurrentMark < 0))
            {
                throw new ArgumentException("CurrentMarks should be more than 0");
            }
        }

        private string GetMarks(ParticipTest participTest)
        {
            if(participTest.Grade5 == -1)
            {
                return "отсутствовал";
            }
            else if (!participTest.OneTwoThreeQuestionMarks.Any())
            {
                return null;
            }
            else
            {
                return participTest.OneTwoThreeQuestionMarks.Select(s => s.AwardedMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
            }
        }

        private readonly Dictionary<int, GradesOptions> _marksCountsByProjectId = new Dictionary<int, GradesOptions>
        {
            [3092] = new GradesOptions
            {
                MinCountForThree = 7,
                MaxCountForThree = 8,
                MinCountForFour = 9,
                MaxCountForFour = 10
            },
            [3093] = new GradesOptions
            {
                MinCountForThree = 7,
                MaxCountForThree = 8,
                MinCountForFour = 9,
                MaxCountForFour = 10
            },
            [3094] = new GradesOptions
            {
                MinCountForThree = 6,
                MaxCountForThree = 7,
                MinCountForFour = 8,
                MaxCountForFour = 8,
                TwoGradeStr = "Учащийся не достиг необходимого уровня осознанности чтения",
                ThreeGradeStr = "Учащийся достиг необходимого уровня осознанности чтения",
                FourGradeStr = "Учащийся имеет хороший уровень осознанности чтения",
                FiveGradeStr = "Учащийся имеет повышенный уровень осознанности чтения"
            },
            [3095] = new GradesOptions
            {
                MinCountForThree = 9,
                MaxCountForThree = 11,
                MinCountForFour = 12,
                MaxCountForFour = 13
            },
            [3096] = new GradesOptions
            {
                MinCountForThree = 8,
                MaxCountForThree = 9,
                MinCountForFour = 10,
                MaxCountForFour = 12
            },
            [3097] = new GradesOptions
            {
                MinCountForThree = 8,
                MaxCountForThree = 10,
                MinCountForFour = 11,
                MaxCountForFour = 12,
                TwoGradeStr = "Учащийся не достиг необходимого уровня осознанности чтения",
                ThreeGradeStr = "Учащийся достиг необходимого уровня осознанности чтения",
                FourGradeStr = "Учащийся имеет хороший уровень осознанности чтения",
                FiveGradeStr = "Учащийся имеет повышенный уровень осознанности чтения"
            },
            [3098] = new GradesOptions
            {
                MinCountForThree = 10,
                MaxCountForThree = 12,
                MinCountForFour = 13,
                MaxCountForFour = 15
            },
            [3099] = new GradesOptions
            {
                MinCountForThree = 10,
                MaxCountForThree = 12,
                MinCountForFour = 13,
                MaxCountForFour = 15
            },
            [3100] = new GradesOptions
            {
                MinCountForThree = 10,
                MaxCountForThree = 12,
                MinCountForFour = 13,
                MaxCountForFour = 14,
                TwoGradeStr = "Учащийся не достиг необходимого уровня осознанности чтения",
                ThreeGradeStr = "Учащийся достиг необходимого уровня осознанности чтения",
                FourGradeStr = "Учащийся имеет хороший уровень осознанности чтения",
                FiveGradeStr = "Учащийся имеет повышенный уровень осознанности чтения"
            }
        };
    }

    public class GradesOptions
    {
        public int MinCountForThree { get; set; }
        public int MaxCountForThree { get; set; }
        public int MinCountForFour { get; set; }
        public int MaxCountForFour { get; set; }
        public int MinPercentToPassNonGeneralPart { get; set; } = 50;

        //public bool IsCht { get; set; } = false;

        public string TwoGradeStr { get; set; } = "Уровень ниже базового";
        public string ThreeGradeStr { get; set; } = "Уровень базовой подготовки";
        public string FourGradeStr { get; set; } = "Уровень прочной базовой подготовки";
        public string FiveGradeStr { get; set; } = "Уровень повышенной подготовки";
    }
}
