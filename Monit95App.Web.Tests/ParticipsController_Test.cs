using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Models;
using Monit95App.Api;
using NSubstitute;
using Monit95App.Services.Interfaces;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using System.Security.Principal;
using System.Web;
using System.Web.Routing;
using System.Web.Http.Controllers;
using Monit95App.Services.DTOs;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core.Entities;
using System.Data.SqlClient;
using System.Data.Entity.Infrastructure;
using Monit95App.Services;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class ParticipsController_Test
    {
        static CokoContext context = new CokoContext();
        GenericRepository<Particip> repo = new GenericRepository<Particip>(context);
        IGenericRepository<Particip> mockRepo = Substitute.For<IGenericRepository<Particip>>();

        [TestCleanup]
        public void CleanUp()
        {
            var testEntities = repo.GetAll().Where(x => x.Surname == "Test").ToList();
            foreach (var testEntity in testEntities)
            {
                repo.Delete(testEntity.Id);
            }
        }

        [TestMethod]
        public void Post_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();

            //Act
            var dto = new ParticipDto
            {
                ProjectId = 201617,
                Surname = "Shakhabov",
                Name = "Adam",
                SchoolId = "0001",
                ClassName = "1 А",
                Id = 123
            };
            var controller = new ParticipsController(mockService, mockRepo);
            controller.Post(dto);

            //Assert
            mockService.Received().Add(dto);
        }

        [TestMethod]
        public void Post_TestConflictResultSqlException2627()
        {
            //Arrange   
            CleanUp();
            var entity = new Particip()
            {
                ProjectId = 201677,
                Surname = "Test",
                Name = "Test",
                SchoolId = "0001",
                ClassId = "0101"
            };
            repo.Insert(entity);

            var mockClassService = Substitute.For<IClassService>();
            mockClassService.GetId("1 А").Returns("0101");
            var controller = new ParticipsController(new ParticipService(repo, mockClassService), mockRepo);

            //Act
            var dto = new ParticipDto()
            {
                ProjectId = 201677,
                Surname = "Test",
                Name = "Test",
                SchoolId = "0001",
                ClassName = "1 А"
            };
            var response = controller.Post(dto);

            //Assert
            Assert.IsInstanceOfType(response, typeof(ConflictResult));
        }

        [TestMethod]
        public void GetByIdFromRoute_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService, mockRepo);
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary {{"id", "123"}});

            //Act
            var response = controller.Get();

            //Assert
            mockService.Received().GetById(123);
        }

        [TestMethod]
        public void GetAll_Call_Coko_Test()
        {
            //Arrange
            var service = Substitute.For<IParticipService>();
            var controller = new ParticipsController(service, mockRepo);
            var dtos = new List<ParticipDto>
            {
                new ParticipDto
                {
                    ProjectId = 201617,
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0001",
                    ClassName = "1 А",
                    Id = 123
                },
                new ParticipDto
                {
                    ProjectId = 201617,
                    Surname = "Muciev",
                    Name = "Adlan",
                    SchoolId = "0005",
                    ClassName = "1 А",
                    Id = 124
                }
            };

            var principal = Substitute.For<IPrincipal>();
            var identity = Substitute.For<IIdentity>();
            identity.Name.Returns("coko");
            principal.IsInRole("area").Returns(false);
            principal.IsInRole("school").Returns(false);

            controller.User = principal;

            //Act            
            var response = controller.GetAll(1);

            //Assert            
            service.GetAll(1, null, null).Received();
        }

        [TestMethod]
        public void GetAll_Call_Area_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService, mockRepo);
            var dtos = new List<ParticipDto>
            {
                new ParticipDto
                {
                    ProjectId = 201617,
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0001",
                    ClassName = "1 А",
                    Id = 123
                },
                new ParticipDto
                {
                    ProjectId = 201617,
                    Surname = "Muciev",
                    Name = "Adlan",
                    SchoolId = "0005",
                    ClassName = "1 А",
                    Id = 124
                }
            };

            var mockPrincipal = Substitute.For<IPrincipal>();
            var mockIdentity = Substitute.For<IIdentity>();
            mockPrincipal.Identity.Returns(mockIdentity);
            mockIdentity.Name.Returns("201");
            mockPrincipal.IsInRole("area").Returns(true);
            mockPrincipal.IsInRole("school").Returns(false);

            controller.User = mockPrincipal;

            //Act            
            var response = controller.GetAll(1);

            //Assert            
            mockService.GetAll(1, 201, null).Received();
        }

        [TestMethod]
        public void Put_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService, mockRepo);

            //Act
            var dto = new ParticipDto()
            {
                ProjectId = 1,
                Surname = "Test",
                Name = "Test",
                SchoolId = "0001",
                ClassName = "1 А"
            };
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary {{ "participTestId", "123"}});
            var response = controller.Put(dto);

            //Assert
            mockService.Update(123, dto);
        }

        [TestMethod]
        public void Put_TestNotFound()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            mockService.When(x => x.Update(123, Arg.Any<ParticipDto>())).Do(x => { throw new ArgumentException(); });
            var controller = new ParticipsController(mockService, mockRepo);

            //Act
            var dto = new ParticipDto()
            {
                ProjectId = 1,
                Surname = "Test",
                Name = "Test",
                SchoolId = "0001",
                ClassName = "1 А"
            };
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary {{"id", "123"}});
            var response = controller.Put(dto);

            //Assert            
            Assert.IsInstanceOfType(response, typeof(NotFoundResult));
        }

        [TestMethod]
        public void Delete_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var mockRepo = Substitute.For<IGenericRepository<Particip>>();
            var controller = new ParticipsController(mockService, mockRepo);
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary {{"id", "123"}});

            //Act
            var response = controller.Delete();

            //Assert
            mockRepo.Received().Delete(123);
        }
    }
}