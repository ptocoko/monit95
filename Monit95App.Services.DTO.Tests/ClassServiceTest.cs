using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;

namespace Monit95App.Domain.DTO.Tests
{
    [TestClass]
    public class ClassServiceTest
    {
        [TestMethod]
        public void GetAllTest()
        {
            //Arrange
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var classRepository = new GenericRepository<Class>(unitOfWork);

            var classService = new ClassService(unitOfWork, classRepository);

            //Act
            var result = classService.GetAll();

            //Assert

            Assert.IsTrue(result.Count != 0);
        }

        [TestMethod]
        public void GetIdTest()
        {
            //Arrange
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var classRepository = new GenericRepository<Class>(unitOfWork);

            var classService = new ClassService(unitOfWork, classRepository);

            //Act
            var result = classService.GetId("2 А"); 

            //Assert
            Assert.AreEqual("0201", result);
        }        
    }
}
