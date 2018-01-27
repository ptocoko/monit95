using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web.Http.Results;
using System.Web.Http.Routing;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95.WebApp.RESTful_API.iTakeEge;
using Monit95App.Services;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Services.ItakeEge.Participant;

namespace Monit95App.Web.Tests
{
    using Monit95App.Domain.Core.Entities;
    using Monit95App.Domain.Interfaces;
    using Monit95App.Infrastructure.Data;
    using Monit95App.Web.Api;

    using NSubstitute;

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
            // Arrange
            var mockService = Substitute.For<IParticipService>();

            // Act
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

            // Assert
            mockService.Received().Add(dto);
        }        

        [TestMethod]
        public void GetByIdFromRoute_Test()
        {
            // Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService, mockRepo);
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary {{"id", "123"}});

            // Act
            var response = controller.Get();

            // Assert
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