﻿using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ProtocolGenerator
{
    public static class ExtendParticipProtocolFactory
    {
        public static ExtendParticipProtocol Greate(TestResultsV2 result)
        {
            var protocol = new ExtendParticipProtocol
            {               
                Surname = result.ExerciseMark.Particip.Surname,
                Name = result.ExerciseMark.Particip.Name,
                SecondName = result.ExerciseMark.Particip.SecondName,
                ClassName = result.ExerciseMark.Particip.Class.Name,
                Marks = result.ExerciseMark.Marks,
                SubjecName = result.ExerciseMark.Test.Name,

                Grade5 = CheckGrade5(result) ?? result.Grade5.ToString(), //if the test has string's version Grade5 then get that via ConvertGrade5                             
                //...
            };
 
            return protocol;
        }

        private static string CheckGrade5(TestResultsV2 result)
        {
            var testGrades = result.ExerciseMark.Test.Grades; 
            return testGrades.Count != 0 ? testGrades.Single(x => x.Grade5 == result.Grade5).ToString() : null; 
        }

        private static Dictionary<Element, double> ConvertElements(TestResultsV2 result)
        {
            var elements = new Dictionary<Element, double>();
            var split = result.Skills.Split(';');
            //...


            return elements;
        }
    }
}
