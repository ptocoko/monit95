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

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class ParticipsController_Test
    {
        [TestMethod]
        public void Post_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();

            //Act
            var dto = new ParticipDto
            {
                ProjectCode = 201617,
                Surname = "Shakhabov",
                Name = "Adam",
                SchoolId = "0001",
                ClassName = "1 А",
                Id = 123
            };
            var controller = new ParticipsController(mockService);
            controller.Post(dto);

            //Assert
            mockService.Received().Add(dto);
        }

        [TestMethod]
        public void GetByIdFromRoute_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService);
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary { { "id", "123" } });

            //Act
            var response = controller.Get();

            //Assert
            mockService.Received().GetById(123);
        }

        [TestMethod]
        public void GetAll_Test()
        {
            //Arrange
            var mockService = Substitute.For<IParticipService>();
            var controller = new ParticipsController(mockService);
            var dtos = new List<ParticipDto>
            {
                new ParticipDto
                {
                    ProjectCode = 201617,
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0001",
                    ClassName = "1 А",
                    Id = 123
                },
                new ParticipDto
                {
                    ProjectCode = 201617,
                    Surname = "Muciev",
                    Name = "Adlan",
                    SchoolId = "0005",
                    ClassName = "1 А",
                    Id = 124
                }
            };

            var principal = Substitute.For<IPrincipal>();
            var identity = Substitute.For<IIdentity>();
            principal.Identity.Returns(identity);
            identity.Name.Returns("Adam"); 

            controller.User = principal;

            //Act            
            var response = controller.GetAll() as OkNegotiatedContentResult<IEnumerable<ParticipDto>>;

            //Assert            
            Assert.AreEqual(2, response.Content.Count());
        }
    }
}
