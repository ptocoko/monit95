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
        public void Get_Test()
        {
            //Act
            var repo = new GenericRepository<ExerciseMark>();
            var item = repo.GetAll().Where(x => x.Id == 65).Single();

            //Assert
            Assert.IsNotNull(item);
            Assert.IsNotNull(item.TestResultsV2);
        }
    }
}
