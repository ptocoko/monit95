using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class ParticipProtocolFactory
    {
        ParticipProtocol Greate(TestResultsV2 result)
        {
            var protocol = new ParticipProtocol
            {
                Id = result.ExerciseMark.ProjectParticipsV2.Id,
                Code = result.ExerciseMark.ProjectParticipsV2.ParticipCode,
                Surname = result.ExerciseMark.ProjectParticipsV2.Surname,
                Name = result.ExerciseMark.ProjectParticipsV2.Name,
                SecondName = result.ExerciseMark.ProjectParticipsV2.SecondName,
                ClassName = result.ExerciseMark.ProjectParticipsV2.Class.Name,               
                //..
            };

            return protocol;
        }
    }
}
