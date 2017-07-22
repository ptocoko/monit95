using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Hosting;
using Monit95App.Services.Interfaces.Rsur;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class RsurParticipsControllerTests
    {
        private IUnitOfWork unitOfWork; 
        private IGenericRepository<ProjectParticip> projectParticipRepository;
        private IGenericRepository<TestResult> testResultRepository;
        private IRsurParticipViewer rsurParticipViewer;
        private IRsurParticipService rsurParticipService;

        [TestInitialize]
        public void TestInitialize()
        {
            unitOfWork = new UnitOfWork(new cokoContext());
            projectParticipRepository = new GenericRepository<ProjectParticip>(unitOfWork);
            testResultRepository = new GenericRepository<TestResult>(unitOfWork);
            rsurParticipViewer = new RsurParticipViewer();
            rsurParticipService = new RsurParticipService(unitOfWork, projectParticipRepository, testResultRepository, rsurParticipViewer);

            var entity = unitOfWork.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");
            entity.Surname = "testSurname";
            unitOfWork.Save();            
        }


        [TestMethod]
        public async void PatchTest()
        {
            //Arrange
            var rsurParticipsController = new RsurParticipsController(rsurParticipService);
            var inRsurParticipBaseInfo = new RsurParticipBaseInfo
            {
                Surname = "Шахабов",
                Name = "Адамо"
            };
            var outRsurParticipBaseInfo = new RsurParticipBaseInfo
            {
                Surname = "Шахабов",
                Name = "Адамо"
            };


            //Act
            var controller = new RsurParticipsController(rsurParticipService);
            var response = controller.Patch(inRsurParticipBaseInfo);


            //Assert
            Assert.Fail();
        }

        [TestMethod]
        public async void PutParticipTest()
        {
            //Arrange
          
            

            var controller = new RsurParticipsController(rsurParticipService)
            {
                Request = new HttpRequestMessage()
            };
            controller.Request.Properties.Add(HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration());

            var model = new RsurParticipBaseInfo
            {
                ProjectCode = 201661,
                ParticipCode = "2016-100-004",
                Surname = "testNewSurname",
                Name = "testNewName"
            };

            //Act
            var message = await controller.PutParticip(model);
            var entity = unitOfWork.DbContext.ProjectParticips.Single(x => x.ParticipCode == "2016-100-004");

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
