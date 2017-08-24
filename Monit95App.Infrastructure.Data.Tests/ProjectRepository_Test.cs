using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class ProjectRepository_Test
    {
        [TestMethod]
        public void GetClassNumbers_Test()
        {
            //Arrange
            var repo = new GenericRepository<Project>();

            //Act
            var result = repo.GetAll().Where(x => x.Code == 1).Select(x => x.ClassNumbers).Single();

            //Assert
            Assert.AreEqual("1", result);
        }
    }
}
