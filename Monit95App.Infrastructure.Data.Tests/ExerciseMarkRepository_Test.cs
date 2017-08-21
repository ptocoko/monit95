using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class ExerciseMarkRepository_Test
    {
        [TestMethod]
        public void TestMethod1()
        {
            var repo = new GenericRepository<ExerciseMark>();
            var items = repo.GetAll();
        }
    }
}
