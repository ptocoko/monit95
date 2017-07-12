using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Hosting;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class RsurParticipControllerTest
    {
        private IUnitOfWork _uow;       

        [TestInitialize]
        public void TestInitialize()
        {
            _uow = new UnitOfWorkV2(new cokoContext());
            var entity = _uow.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");
            entity.Surname = "testSurname";
            _uow.Save();
        }

        [TestMethod]
        public async void PutParticipTest()
        {
            //Arrange
            var participRepository = new GenericRepository<ProjectParticip>(_uow);
            var testResultRepository = new GenericRepository<TestResult>(_uow);
            var participViewer = new RsurParticipViewer();
            var service = new RsurParticipService(_uow, participRepository, testResultRepository, participViewer);
            

            var controller = new RsurParticipsController(service)
            {
                Request = new HttpRequestMessage()
            };
            controller.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            var model = new RsurParticipBaseModel
            {
                ProjectCode = 201661,
                ParticipCode = "2016-100-004",
                Surname = "testNewSurname",
                Name = "testNewName"
            };

            //Act
            var message = await controller.PutParticip(model);
            var entity = _uow.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");

            //Assert
            Assert.AreEqual(message.StatusCode, HttpStatusCode.OK);
            Assert.AreEqual(entity.Surname, "testNewSurname");
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
            _uow.Dispose();
        }
    }
}
