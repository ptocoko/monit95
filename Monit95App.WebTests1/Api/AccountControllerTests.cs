using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNet.Identity;

namespace Monit95App.Api.Tests
{
    [TestClass()]
    public class AccountControllerTests
    {
        [TestMethod()]
        public void GetTest()
        {
            //Arrange

            var mockIdentity = new ClaimsIdentity();
            mockIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, "5e8878da-b529-4dd6-9a71-603fa8651c14"));            
            var mockPrincipal = new ClaimsPrincipal(mockIdentity);
            var controller = new AccountController
            {
                User = mockPrincipal
            };            

            //Act
            var result = controller.Get();

            //Assert
            Assert.Fail();
        }
    }
}
