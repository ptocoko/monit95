using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Monit95App.Models;
using Monit95App.Services.Interfaces;
using Monit95App.Web.Services;
using NSubstitute;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Monit95App.Services.Rsur;
using System.Web.Http.Routing;
using System.Web.Routing;
using Monit95App.Domain.Core;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class RsurParticipsControllerTest
    {
        private readonly IUserService _mockUserService;
        private readonly IRsurParticipService _mockRsurParticipService;
        private readonly RsurParticipsController _rsurParticipsController;

        public RsurParticipsControllerTest()
        {
            _mockUserService = Substitute.For<IUserService>();
            _mockRsurParticipService = Substitute.For<IRsurParticipService>();
            _rsurParticipsController = new RsurParticipsController(_mockRsurParticipService, _mockUserService);
        }

        [TestMethod]
        public void Get_Test()
        {
            //Arrange
            var stubUserModel = new UserModel
            {
                UserName = "0005",
                UserRoleNames = new[] { "school" }
            };
            var stubRsurParticipBaseInfos = new List<RsurParticipFullInfo>
            {
                new RsurParticipFullInfo
                {
                    Surname = "Шахабов",
                    Name = "Адам"
                }
            };
            
            _mockUserService.GetModel(Arg.Any<string>()).Returns(stubUserModel);            
            _mockRsurParticipService.Get(Arg.Any<int>(), Arg.Any<string>()).Returns(stubRsurParticipBaseInfos);            

            //Act
            var actionResult = _rsurParticipsController.Get();            

            //Assert
            Assert.IsNotNull(actionResult);
            _mockUserService.Received().GetModel(null);
            _mockRsurParticipService.Received().Get(null, "0005");
            Assert.IsInstanceOfType(actionResult, typeof(OkNegotiatedContentResult<IEnumerable<RsurParticipBaseInfo>>));
        }

        [TestMethod]
        public void PutByAdmin_Test()
        {
            //Arrange            
            var stubUserModel = new UserModel
            {
                UserName = "coko", 
                UserRoleNames = new[] {"admin"}
            };
            _mockUserService.GetModel(Arg.Any<string>()).Returns(stubUserModel);
            _rsurParticipsController.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary { { "ParticipCode", "2016-201-000" } });

            //Act            
            var fullInfo = new RsurParticipFullInfo
            {
                Surname = "Adam",
                Name = "Shakhabov"
            };
            var actionResult =_rsurParticipsController.Put(fullInfo);

            //Assert
            Assert.IsInstanceOfType(actionResult, typeof(OkNegotiatedContentResult<RsurParticipFullInfo>));
            _mockRsurParticipService.DidNotReceive().GetEntity(Arg.Any<string>());
            _mockRsurParticipService.Received().Update(fullInfo, true);
        }

        [TestMethod]
        public void PutByArea_Test_Ok()
        {
            //Arrange            
            var mockUserModel = new UserModel
            {
                UserName = "201",
                UserRoleNames = new[] { "area" }
            };
            var mockEntity = new ProjectParticip
            {
                School = new School {AreaCode = 201}
            };
            _mockUserService.GetModel(Arg.Any<string>()).Returns(mockUserModel);
            _mockRsurParticipService.GetEntity("2016-201-000").Returns(mockEntity);
            _rsurParticipsController.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary { { "ParticipCode", "2016-201-000" } });

            //Act            
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-201-000",
                Surname = "Adam",
                Name = "Shakhabov",
                SecondName = "Khavajievich"
            };
            var actionResult = _rsurParticipsController.Put(fullInfo);

            //Assert
            Assert.IsInstanceOfType(actionResult, typeof(OkNegotiatedContentResult<RsurParticipFullInfo>));
            _mockRsurParticipService.Received().GetEntity("2016-201-000");
            _mockRsurParticipService.Received().Update(fullInfo, false);
        }

        [TestMethod]
        public void PutByArea_Test_Fail()
        {
            //Arrange            
            var mockUserModel = new UserModel
            {
                UserName = "201",
                UserRoleNames = new[] { "area" }
            };
            var mockEntity = new ProjectParticip
            {
                School = new School { AreaCode = 202 }
            };
            _mockUserService.GetModel(Arg.Any<string>()).Returns(mockUserModel);
            _mockRsurParticipService.GetEntity("2016-202-000").Returns(mockEntity);
            _rsurParticipsController.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary { { "ParticipCode", "2016-202-000" } });

            //Act            
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-202-000",
                Surname = "Adam",
                Name = "Shakhabov",
                SecondName = "Khavajievich"
            };
            var actionResult = _rsurParticipsController.Put(fullInfo);
            var actionResultStatusCode = (StatusCodeResult) actionResult;            

            //Assert            
            Assert.AreEqual(HttpStatusCode.Forbidden, actionResultStatusCode.StatusCode);
            _mockRsurParticipService.Received().GetEntity("2016-202-000");
            _mockRsurParticipService.
                
                ().Update(Arg.Any<RsurParticipFullInfo>(), Arg.Any<bool>());
        }

        public void GetByUserNameTest()
        {
            //Arange
            //Act

            //Assert
            Assert.Fail();
        }

        [TestCleanup]
        public void TestCleanup()
        {
          //  _uow.Dispose();
        }
    }
}
