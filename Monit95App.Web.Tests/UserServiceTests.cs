using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data.Entity;
using Monit95App.Models;
using Moq;
using Monit95App.Web.Services;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class UserServiceTests
    {
        [TestMethod]
        public void GetModelTest()
        {
            //Arrange
            var mockSet = new Mock<IDbSet<ApplicationUser>>();
            var mockContext = new Mock<ApplicationDbContext>();
            mockContext.Setup(m => m.Users).Returns(mockSet.Object);

            //Act
            var userService = new UserService(mockContext.Object);

            //Assert
            Assert.Fail();
        }
    }
}
