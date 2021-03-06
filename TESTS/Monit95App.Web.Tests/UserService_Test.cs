using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Models;
using Monit95App.Web.Services;
using System.Linq;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class UserServiceTest
    {
        [TestMethod]
        public void GetModel_Test()
        {          
            //Act            
            var service = new AccountService(new ApplicationDbContext());
            var model = service.GetModel("5dcf65f5-2e42-4ad1-bfe2-6704af42eead");

            //Assert
            Assert.AreEqual("school", model.RoleNames.Single());
        }        
    }
}
