using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneTwoThreeReporter
{
    public class ParticipProtocolFactory
    {
        ParticipProtocol Greate(TestResultsV2 result)
        {
            var protocol = new ParticipProtocol
            {
                ExerciseMarkId = result.ExerciseMarkId,
                Surname = result.ExerciseMark.ProjectParticipsV2.Surname,
                Name = result.ExerciseMark.ProjectParticipsV2.Name,
                SecondName = result.ExerciseMark.ProjectParticipsV2.SecondName,
                ClassName = result.ExerciseMark.ProjectParticipsV2.Class.Name,
                SubjectName = result.ExerciseMark.Test.Name, //
                ///..
            };

            return protocol;
        }
    }
}
