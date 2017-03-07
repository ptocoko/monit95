using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Services.DTO
{
    public class ExerMarkDTOcreator : IExerMarkDTOcreator
    {
        public IEnumerable<ExerMarkDTO> FactoryMethod(ParticipTest participTest)
        {        
            if(participTest == null)
            {
                throw new ArgumentException("ExerMarkDTOcreator.FactoryMethod got null ParticipTest's param");
            }    
            var result = new List<ExerMarkDTO>();
            if (participTest.ExerMarks.Count != 0)
            {                
                foreach(var exerMark in participTest.ExerMarks)
                {
                    result.Add(new ExerMarkDTO
                    {
                        ExerNumber = exerMark.ExerNumber,
                        ExerMaxMark = exerMark.TestExercis.ExerMaxMark,
                        ExerCurrentMar = exerMark.Mark
                    });
                }                
            }
            else
            {
                foreach(var testExercise in participTest.ProjectTest.Test.TestExercises)
                {
                    result.Add(new ExerMarkDTO
                    {
                        ExerNumber = testExercise.ExerNumber,
                        ExerMaxMark = testExercise.ExerMaxMark,
                        ExerCurrentMar = -1
                    });
                }
            }

            return result;
        }
    }
}