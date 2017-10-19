using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

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

            var actual = _context.Questions.Find(1).School.Name;

            Assert.AreEqual(expected, actual);
        }
    }
}
