﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models.Rsur;
using Monit95App.Web.Services;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Results;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class RsurParticipsControllerTest
    {
        private IUnitOfWork _uow;       

        [TestInitialize]
        public void TestInitialize()
        {
            //_uow = new UnitOfWork(new cokoContext());
            //var entity = _uow.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");
            //entity.Surname = "testSurname";
            //_uow.Save();
        }

        [TestMethod]
        public void GetTest()
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

            var mockUserService = Substitute.For<IUserService>();
            mockUserService.GetModel(Arg.Any<string>()).Returns(stubUserModel);
            var mockRsurParticipService = Substitute.For<IRsurParticipService>();
            mockRsurParticipService.Get(Arg.Any<int>(), Arg.Any<string>()).Returns(stubRsurParticipBaseInfos);
            var rsurParticipsController = new RsurParticipsController(mockRsurParticipService, mockUserService);

            //Act
            var actionResult = rsurParticipsController.Get();            

            //Assert
            Assert.IsNotNull(actionResult);
            mockUserService.Received().GetModel(null);
            mockRsurParticipService.Received().Get(null, "0005");
            Assert.IsInstanceOfType(actionResult, typeof(OkNegotiatedContentResult<IEnumerable<RsurParticipBaseInfo>>));
        }


        [TestMethod]
        public async void PutParticipTest()
        {
            //Arrange
            //var mockUserService = Substitute.For<IUserService>;

            //var participRepository = new GenericRepository<ProjectParticip>(_uow);
            //var testResultRepository = new GenericRepository<TestResult>(_uow);
            //var participViewer = new RsurParticipViewer();
            //var service = new RsurParticipService(_uow, participRepository, testResultRepository, participViewer);
            

            //var controller = new RsurParticipsController(service)
            //{
            //    Request = new HttpRequestMessage()
            //};
            //controller.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());
            
            //var model = new RsurParticipBaseInfo(new ProjectParticip())
            //{
            //    ProjectCode = 201661,
            //    ParticipCode = "2016-100-004",
            //    Surname = "testNewSurname",
            //    Name = "testNewName"
            //};

            ////Act
            //var message = await controller.PutParticip(model);
            //var entity = _uow.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");

            ////Assert
            //Assert.AreEqual(message.StatusCode, HttpStatusCode.OK);
            //Assert.AreEqual(entity.Surname, "testNewSurname");

            Assert.Fail();
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
