using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.ComponentModel.DataAnnotations;
using Monit95App.Web.Api;
using NSubstitute;
using Monit95App.Services.Interfaces;
using Monit95App.Services.DTOs;
using System.Web.Http.Results;
using System.Web.Http.Routing;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class MarksController_Test
    {
        [TestMethod]        
        public void Post_Test()
        {
            //Arrange
            var mockService = Substitute.For<IMarksService>();

            //Act
            var dto = new PostMarksDto
            {
                ParticipTestId = 123,                
                Marks = "1;1;0,5"
            };
            var controller = new MarksController(mockService);
            var response = controller.Post(dto);

            //Assert
            mockService.Received().Add(dto);
        }

        [TestMethod]
        public void GetAll_Test()
        {
            //Arrange
            var mockService = Substitute.For<IMarksService>();

            //Act         
            var controller = new MarksController(mockService);
            var response = controller.GetAll(1);

            //Assert
            mockService.Received().GetParticipMarksDtos(1, "0005");
        }

        [TestMethod]
        public void Put_Test()
        {
            //Arrange
            var mockService = Substitute.For<IMarksService>();
            var controller = new MarksController(mockService);

            //Act
            var dto = new PostMarksDto()
            {
                ParticipTestId = 123,
                Marks = "1;2;3"                
            };
            controller.RequestContext.RouteData = new HttpRouteData(
                new HttpRoute(),
                new HttpRouteValueDictionary { { "participTestId", "123" } });
            var response = controller.Put(dto);

            //Assert
            mockService.Update(123, dto);
        }
    }
}
