﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Models;
using Monit95App.Api;
using NSubstitute;
using Monit95App.Services.Interfaces;

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
    }
}
