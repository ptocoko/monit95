using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.MarksConvert;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RsurMarksConverter_Test
    {
        [TestMethod]
        public void GenerateByParticipTestId_Test()
        {
            var service = new RsurMarksConverter(new CokoContext());

            var firstExpectedGrade = 2;
            var (firstGrade5, firstEgeQuestionValues) = service.GenerateAndSaveByParticipTestId(14852); // 0;1;1;0;0;1;1;1;1;1;0;0;1;0;1;1;1;1;1;1;1;0;1;1 rsurTestId - 2097
            Assert.AreEqual(firstExpectedGrade, firstGrade5);

            var secondExpectedGrade = 2;
            var (secondGrade5, secondEgeQuestionValues) = service.GenerateAndSaveByParticipTestId(14856); //1;1;1;0;1;1;1;1;1;1;0;1;0;1;1;0;1;1;1;1;1;1;1;1 rsurTestId - 2097
            Assert.AreEqual(secondExpectedGrade, secondGrade5);

            var thirdExpectedGrade = 2;
            var (thirdGrade5, thirdEgeQuestionValues) = service.GenerateAndSaveByParticipTestId(15325); //1;1;1;1;0;1;1;1;1;1;1;0;1;1;1;1 rsurTestId - 2100
            Assert.AreEqual(thirdExpectedGrade, thirdGrade5);
        }
    }
}
