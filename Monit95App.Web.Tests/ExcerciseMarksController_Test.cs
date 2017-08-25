using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.ComponentModel.DataAnnotations;
using Monit95App.Web.Api;
using NSubstitute;
using Monit95App.Services.Interfaces;
using Monit95App.Services.DTOs;
using System.Web.Http.Results;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class ExcerciseMarksController_Test
    {
        [TestMethod]        
        public void Post_TestReturnInvalidModelStateResult()
        {
            //Arrange
            var mockService = Substitute.For<IExerciseMarkService>();

            //Act
            var dto = new ExerciseMarkDto
            {
                ParticipId = 123,
                TestId = "...",
                Marks = ""
            };
            var controller = new ExerciseMarksController(mockService);
            var response = controller.Post(dto);

            //Assert
            mockService.Received().Add(dto);

        }
    }
}
