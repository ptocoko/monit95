using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using NSubstitute;
using Monit95App.Domain.Core.Entities;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class MarksServiceTest
    {
        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void Add_ValidationExceptionTest()
        {
            //Arrange
            var mockRepo = Substitute.For<IGenericRepository<Result>>();
            var dto = new PostMarksDto
            {
                ParticipTestId = 123,
                Marks = "1;0,5;"
            };

            //Act    
            var service = new MarksService(mockRepo);
            service.Add(dto);
        }

        [TestMethod]
        public void Add_OkTest()
        {
            //Arrange
            var mockRepo = Substitute.For<IGenericRepository<Result>>();
            var dto = new PostMarksDto
            {
                ParticipTestId = 123,
                Marks = "1;0,5"
            };

            //Act    
            var service = new MarksService(mockRepo);
            service.Add(dto);

            //Assert
            mockRepo.Received().Insert(Arg.Is<Result>(pr => pr.ParticipTestId == 123
                                                         && pr.Marks == "1;0,5"));
        }

        [TestMethod]
        public void GetParticipMarksDtosTest()
        {
            //Arrange
            var mockRepo = Substitute.For<IGenericRepository<Result>>();
            var results = new List<Result>
            {
                new Result
                {
                    Marks = "1;2;3",
                    ParticipTest = new ParticipTest
                    {
                        ProjectTestId = 1,
                        Particip = new Particip
                        {
                            SchoolId = "0001",
                            Surname = "Shakhabov",
                            Name = "Adam",
                            SecondName = "...",
                            Class = new Class { Name = "1 А" },
                        }
                    }
                },
                new Result
                {
                    Marks = "1;2;3",
                    ParticipTest = new ParticipTest
                    {
                        ProjectTestId = 1,
                        Particip = new Particip
                        {
                            SchoolId = "0002",
                            Surname = "Esembaev",
                            Name = "Husain",
                            SecondName = "...",
                            Class = new Class { Name = "1 А" },
                        }
                    }
                }
            }.AsQueryable();
            mockRepo.GetAll().Returns(results);

            //Act
            var service = new MarksService(mockRepo);
            var dto = service.GetParticipMarksDtos(1, "0001").Single();

            //Assert
            Assert.IsTrue(dto.Surname == "Shakhabov");
            Assert.IsTrue(dto.Name == "Adam");
            Assert.IsTrue(dto.SecondName == "...");
            Assert.IsTrue(dto.ClassName == "1 А");
            Assert.IsTrue(dto.Marks == "1;2;3");
        }

        [TestMethod]
        public void Update_Test()
        {
            //Arrange            
            var mockRepo = Substitute.For<IGenericRepository<Result>>();
            var entity = new Result
            {
                ParticipTestId = 1,
                Marks = "1;2;3"

            };
            mockRepo.GetById(1).Returns(entity);

            //Act
            var dto = new PutMarksDto
            {
                Marks = "1;2;4,6"
            };
            var service = new MarksService(mockRepo);
            service.Update(1, dto);

            //Assert
            mockRepo.Received().Update(Arg.Is<Result>(x => x.Marks == "1;2;4,6"));
        }
    }
}
