using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System.Linq;

namespace Monit95App.Domain.DTO.Tests
{
    [TestClass]
    public class ClassService_Test
    {
        [TestMethod]
        public void GetAll_Test()
        {
            //Act
            var context = new CokoContext();
            var classRepository = new GenericRepository<Class>(context);
            var classService = new ClassService(classRepository);
            var result = classService.GetAll();

            //Assert
            Assert.IsTrue(result.Count() != 0);
        }

        [TestMethod]
        public void GetIdTest()
        {
            //Arrange        
            var context = new CokoContext();
            var classRepository = new GenericRepository<Class>(context);

            var classService = new ClassService(classRepository);

            //Act
            var result = classService.GetId("2 А"); 

            //Assert
            Assert.AreEqual("0201", result);
        }        
    }
}
