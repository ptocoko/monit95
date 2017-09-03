using System.IO;
using System.Text;
using System.Threading.Tasks;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Monit95App.Models;
using Monit95App.Services.Interfaces;
using Monit95App.Web.Api;
using Monit95App.Web.Services;

using Moq;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class FilesController_Test
    {
        [TestMethod]
        public void GetTest()
        {
            // Arrange
            var mockUserService = new Mock<IAccountService>();
            var mockRsurReportModelService = new Mock<IRsurReportModelConverter>();
            mockRsurReportModelService.Setup(x => x.GetStream(null, "0005")).Returns(Task.FromResult((Stream)new MemoryStream(Encoding.UTF8.GetBytes("simple"))));
            var userModel = new AccountModel
            {
                UserName = "0005",
                RoleNames = new[] { "school" }
            };
            mockUserService.Setup(x => x.GetModel(It.IsAny<string>())).Returns(userModel);

            //Act
            var filesController = new FilesController(mockRsurReportModelService.Object, mockUserService.Object);
            var httpResponseMessage =  filesController.Get("0005").Result;
            var contentAsString = httpResponseMessage.Content.ReadAsStringAsync().Result;

            //Assert
            Assert.IsNotNull(httpResponseMessage);
            Assert.AreEqual("simple", contentAsString);
            //Assert.Fail();
            mockUserService.Verify(x => x.GetModel(It.IsAny<string>()));
            
        }
    }
}
