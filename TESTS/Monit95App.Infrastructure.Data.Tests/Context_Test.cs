using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class Context_Test
    {
        private CokoContext _context;

        [TestInitialize]
        public void Init()
        {
            _context = new CokoContext();
        }

        [TestMethod]
        public void QuestionsEntity_Test()
        {
            var expected = "Fake School Fake Name";

            var actual = _context.Questions.First().School.Name;

            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void TestQuestionEntity_Test()
        {
            var expected = "Fake Test";

            var actual = _context.TestQuestions.First().Test.Name;

            Assert.AreEqual(expected, actual);
        }
    }
}
