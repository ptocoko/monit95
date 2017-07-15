using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services;
using Moq;
using Monit95App.Models;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Api;
using Monit95App.Web.Services;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class FilesControllerTests
    {
        [TestMethod]
        public void  GetTest()
        {
            //Arrange
            var mockUserService = new Mock<IUserService>();
            var mockRsurReportModelService = new Mock<IRsurReportModelConverter>();
            mockRsurReportModelService.Setup(x => x.GetStream(null, "0005")).Returns(Task.FromResult((Stream)new MemoryStream(Encoding.UTF8.GetBytes("simple"))));
            var userModel = new UserModel
            {
                UserName = "0005",
                UserRoleNames = new string[] { "school" }
            };
            mockUserService.Setup(x => x.GetModel(It.IsAny<string>())).Returns(userModel);

            //Act
            var filesController = new FilesController(mockRsurReportModelService.Object, mockUserService.Object);
            var httpResponseMessage =  filesController.Get("0005").Result;
            var contentAsString = httpResponseMessage.Content.ReadAsStringAsync().Result;

            //Assert
            Assert.IsNotNull(httpResponseMessage);
            Assert.AreEqual("simple", contentAsString);
            mockUserService.Verify(x => x.GetModel(It.IsAny<string>()));
        }
    }
}
