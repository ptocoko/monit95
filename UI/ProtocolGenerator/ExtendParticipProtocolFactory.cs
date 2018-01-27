using System;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ProtocolGenerator
{
    public static class ExtendParticipProtocolFactory
    {
        public static ExtendParticipProtocol Greate(Result result)
        {
            throw new NotImplementedException();
            //var protocol = new ExtendParticipProtocol
            //{               
            //    Surname = result.ParticipTest.Particip.Surname,
            //    Name = result.ParticipTest.Particip.Name,
            //    SecondName = result.ParticipTest.Particip.SecondName,
            //    ClassName = result.ParticipTest.Particip.Class.Name,
            //    Marks = result.Marks,
            //    SubjecName = result.ParticipTest.ProjectTest.Test.Name,

            //    Grade5 = CheckGrade5(result) ?? result.Grade5.ToString(), //if the test has string's version Grade5 then get that via ConvertGrade5                             
            //    //...
            //};
 
            //return protocol;
        }

        private static string CheckGrade5(Result result)
        {
            var testGrades = result.ParticipTest.ProjectTest.Test.Grades; 
            return testGrades.Count != 0 ? testGrades.Single(x => x.Grade5 == result.Grade5).ToString() : null; 
        }

        //private static Dictionary<Element, double> ConvertElements(Result result)
        //{
        //    var elements = new Dictionary<Element, double>();
        //    var split = result.ElementValues.Split(';');
        //    //...


        //    return elements;
        //}
    }
}
