using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data.Entity;
using Monit95App.Models;
using Moq;
using Monit95App.Web.Services;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class UserServiceTests
    {
        [TestMethod]
        public void GetModelTest()
        {
            //Arrange         
            var mockRoles = new List<IdentityUserRole>
            {
                new IdentityUserRole
                {
                #warning role error
                    //Role = new IdentityRole { Name = "school" }
                }
            };

            var mockContext = new Mock<ApplicationDbContext>();
            var mockSet = new Mock<IDbSet<ApplicationUser>>();            
            var mockAppUser = new Mock<ApplicationUser>();

            mockAppUser.SetupGet(x => x.UserName).Returns("0005");
            mockAppUser.SetupGet(x => x.Roles).Returns(mockRoles);
            mockContext.Setup(x => x.Users).Returns(mockSet.Object);
            mockSet.Setup(x => x.Find(It.IsAny<string>())).Returns(mockAppUser.Object);
            
            //Act
            var userService = new UserService(mockContext.Object);
            var result = userService.GetModel("12345");

            //Assert
            Assert.IsTrue(result.UserRoleNames.First().Equals("school"));            
        }
    }
}
