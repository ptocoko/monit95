using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using NSubstitute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ParticipService_Test
    {
        [TestMethod]
        public void Add_Test()
        {
            //Arrange
            var mockClassService = Substitute.For<IClassService>();
            mockClassService.GetId("1 А").Returns("0101");            

            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();
            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);

            //Act
            var dto = new ParticipDto
            {
                ProjectId = 201661,
                Surname = "Shakhabov",
                Name = "Adam",                
                SchoolId = "0005",
                ClassName = "1 А"
            };
            var id = service.Add(dto);

            //Assert            
            mockParticipRepository.Received().Insert(Arg.Is<Particip>(x => x.Surname == "Shakhabov"));
        }

        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void Add_TestArgumentException()
        {
            //Arrange
            string nullString = null;

            var mockClassService = Substitute.For<IClassService>();
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();
            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);

            //Act
            var dto = new ParticipDto
            {
                ProjectId = 201661,
                Surname = "Shakhabov",
                Name = "Adam",
                SchoolId = "0005",
                ClassName = "1 _А"
            };
            var id = service.Add(dto);

            //Assert            
            //Exception
        }       

        [TestMethod]
        public void Update_Test()
        {
            //Arrange

            var mockClassService = Substitute.For<IClassService>();
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();

            var entity = new Particip
            {
                Id = 123,
                Surname = "Testu",
                Name = "test",
                SecondName = "test",
                SchoolId = "0005",
                ClassId = "0101"

            };
            mockParticipRepository.GetById(123).Returns(entity);

            //Act
            var dto = new ParticipDto
            {
                ProjectId = 1,
                Surname = "Test",
                Name = "Test",
                SchoolId = "0001",
                ClassName = "1 А"
            };
            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);
            service.Update(123, dto);

            //Assert
            mockParticipRepository.Received().Update(Arg.Is<Particip>(x => x.ClassId == "0101"));
            mockParticipRepository.Received().Update(Arg.Is<Particip>(x => x.ProjectId == 1));
        }

        [TestMethod]
        public void Update_IntegrationTest()
        {
            //Arrange           
            var mockClassService = Substitute.For<IClassService>();
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();

            //Act
            var dto = new ParticipDto
            {
                ProjectId = 201677,
                Surname = "Test_new",
                Name = "...",
                SchoolId = "0000",
                ClassName = "1 А"
            };
            var context = new CokoContext();
            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);
            service.Update(91281, dto);





            //Assert
         
        }

        [TestMethod]
        public void GetById_Test()
        {
            //Arrange
            var mockClassService = Substitute.For<IClassService>();
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();

            var entity = new Particip
            {
                Id = 123,
                ProjectId = 201661,
                Surname = "Shakhabov",
                Name = "Adam",
                SchoolId = "0005",
                Class = new Class { Id = "0101", Name = "1 А" }
            };
            mockParticipRepository.GetById(123).Returns(entity);
            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);

            //Act
            var dto = service.GetById(123);

            //Assert
            Assert.AreEqual("Shakhabov", dto.Surname);
            Assert.AreEqual("1 А", dto.ClassName);
        }

        [TestMethod]
        public void GetAllDtos_Test()
        {
            //Arrange
            var mockClassService = Substitute.For<IClassService>();
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepository = Substitute.For<IGenericRepository<ParticipTest>>();
            var mockResultRepository = Substitute.For<IGenericRepository<Result>>();

            var service = new ParticipService(mockParticipRepository, mockParticipTestRepository, mockResultRepository, mockClassService);
            var dtos = new List<Particip>
            {
                new Particip
                {
                    ProjectId = 201661,
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0001",
                    School = new Domain.Core.Entities.School { Id = "0001", AreaCode = 201 }
            },
                new Particip
                {
                    ProjectId = 201661,
                    Surname = "Esembaev",
                    Name = "Husain",
                    SchoolId = "0002",
                    School = new Domain.Core.Entities.School { Id = "0002", AreaCode = 202 }
                }
            }.AsQueryable();
            mockParticipRepository.GetAll().Returns(dtos);

            //Act
            var cokoDtos = service.GetAll(1, null, null);
            var areaDtos = service.GetAll(1, 201, null);
            var schoolDtos = service.GetAll(1, null, "0001");

            //Assert
            Assert.AreEqual(cokoDtos.Count(), 2);
            Assert.AreEqual(1, areaDtos.Count());
            Assert.IsTrue(schoolDtos.All(x => x.SchoolId == "0001"));
            
        }               
    }
}
