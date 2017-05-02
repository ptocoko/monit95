using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class TestResultV2Service : ITestResultV2Service
    {
        private IRepositoryV2<TestResultsV2> _testResultV2Rep;
        private IRepositoryV2<ExerciseMark> _exerciseMarkRep;

        public TestResultV2Service(IRepositoryV2<TestResultsV2> testResultV2Rep, IRepositoryV2<ExerciseMark> exerciseMarkRep)
        {
            _testResultV2Rep = testResultV2Rep;
            _exerciseMarkRep = exerciseMarkRep;
        }

        public Task<TestResultV2Dto> GetByMarkIdAsync(int exerciseMarkId)
        {
            return Task.Run(() =>
            {
                if (exerciseMarkId != 0)
                {
                    var testResult = _testResultV2Rep.GetAll().Where(p => p.ExerciseMarkId == exerciseMarkId).Single();

                    if (testResult != null)
                        return new TestResultV2Dto { Id = testResult.Id, ExerciseMarkId = testResult.ExerciseMarkId, Grade5 = testResult.Grade5, Skills = testResult.Skills };
                    else
                        throw new NullReferenceException();
                }
                else
                    throw new ArgumentNullException();
            });
        }

        public Task<List<TestResultV2Dto>> GetByParticipIdAsync(int participId)
        {
            return Task.Run(() =>
            {
                if (participId != 0)
                {
                    var marksIds = _exerciseMarkRep.GetAll().Where(p => p.ProjectParticipId == participId).Select(s => s.Id).ToList();
                    var tempResults = _testResultV2Rep.GetAll().Where(p => marksIds.Contains(p.ExerciseMarkId)).ToList();

                    List<TestResultV2Dto> testResults = new List<TestResultV2Dto>();
                    foreach(var temp in tempResults)
                    {
                        testResults.Add(new TestResultV2Dto { Id = temp.Id, ExerciseMarkId = temp.ExerciseMarkId, Grade5 = temp.Grade5, Skills = temp.Skills });
                    }

                    return testResults;
                }
                else
                    throw new ArgumentNullException();
            });
        }
    }
}
