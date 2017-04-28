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
        private IRepositoryV2<TestResultsV2> _testREsultV2Rep;
        private IUnitOfWork _unitOfWork;

        public TestResultV2Service(IRepositoryV2<TestResultsV2> testResultV2Rep, IUnitOfWork unitOfWork)
        {
            _testREsultV2Rep = testResultV2Rep;
            _unitOfWork = unitOfWork;
        }

        public Task<TestResultV2Dto> GetByMarkIdAsync(int exerciseMarkId)
        {
            return Task.Run(() =>
            {
                if (exerciseMarkId != 0)
                {
                    var testResult = _testREsultV2Rep.GetById(exerciseMarkId);

                    if (testResult != null)
                        return new TestResultV2Dto { Id = testResult.Id, ExerciseMarkId = testResult.ExerciseMarkId, Grade5 = testResult.Grade5, Skills = testResult.Skills };
                    else
                        throw new NullReferenceException();
                }
                else
                    throw new ArgumentNullException();
            });
            
        }
    }
}
