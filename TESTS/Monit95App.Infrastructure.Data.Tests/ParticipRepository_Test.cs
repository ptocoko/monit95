using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class ParticipRepository_Test
    {
        [TestMethod]
        public void GetAll_Test()
        {
            //Act
            var context = new CokoContext();
            var repo = new GenericRepository<Particip>(context);
            var items = repo.GetAll().First();

            //Assert
            Assert.IsNotNull(items.School);            
        }
    }
}
