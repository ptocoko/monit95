using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;
using ProtocolGenerator.Interfaces;

namespace ProtocolGenerator
{
    public static class ExtendParticipProtocolFactory
    {
        public static ExtendParticipProtocol Greate(TestResultsV2 result)
        {
            var protocol = new ExtendParticipProtocol
            {               
                Surname = result.ExerciseMark.ProjectParticipsV2.Surname,
                Name = result.ExerciseMark.ProjectParticipsV2.Name,
                SecondName = result.ExerciseMark.ProjectParticipsV2.SecondName,
                ClassName = result.ExerciseMark.ProjectParticipsV2.Class.Name,
                Marks = result.ExerciseMark.Marks,
                SubjecName = result.ExerciseMark.Test.Name,

                Id = result.ExerciseMark.ProjectParticipsV2.ParticipCode
                     ?? result.ExerciseMark.ProjectParticipsV2.Id.ToString(),
                Grade5 = CheckGrade5(result) ?? result.Grade5.ToString(), //if the test has string's version Grade5 then get that via ConvertGrade5                             
                ElementValues = 
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
            foreach (var element in COLLECTION)
            {
                
            }


            return elements;
        }
    }
}
