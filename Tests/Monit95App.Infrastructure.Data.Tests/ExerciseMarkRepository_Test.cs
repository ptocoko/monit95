using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class ExerciseMarkRepository_Test
    {
        [TestMethod]
        public void GetAll_Test()
        {
            //Act
            var repo = new GenericRepository<ExerciseMark>();
            var items = repo.GetAll();

            //Assert
            Assert.IsTrue(items.Count() > 0);
        }
    }
}
