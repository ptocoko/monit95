using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using System.Collections.Generic;
using Monit95App.Infrastructure.Data.Tests;
using Moq;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO.Interfaces;
using System.Linq;

namespace Monit95App.Services.DTO.Tests
{
    [TestClass]
    public class ProjectParticipV2ServiceTest
    {
        [TestMethod]
        public void DeleteTest()
        {
            //Arrange
            var entities = new List<ProjectParticipsV2>
            {
                new ProjectParticipsV2
                {
                    Id = 1,
                    ProjectCode = 201677,
                    ParticipCode = "null",
                    Surname = "Шахабов",
                    Name = "Адаму",
                    SecondName = "Хаважиевич",
                    SchoolId = "0286",
                    ClassCode = "0100"
                },
                new ProjectParticipsV2
                {
                    Id = 2,
                    ProjectCode = 201677,
                    ParticipCode = "null",
                    Surname = "Муциев",
                    Name = "Адлан",
                    SecondName = "Русланович",
                    SchoolId = "0286",
                    ClassCode = "0100"
                },
            }.AsQueryable();
            var mockEntitySetHandler = new MockTSetCreator<ProjectParticipsV2>();
            var mockEntitySet = mockEntitySetHandler.FactoryMethod(entities);

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ProjectParticipsV2).Returns(mockEntitySet.Object);
            mockContext.Setup(x => x.Set<ProjectParticipsV2>()).Returns(mockEntitySet.Object);

            var mockClassService = new Mock<IClassService>();
            mockClassService.Setup(x => x.GetId("1 А")).Returns("0101");

            var unitOfWork = new UnitOfWorkV2(mockContext.Object);
            var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);

            //Act
            var service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, mockClassService.Object);
            var dto = new ProjectParticipV2Dto
            {
                Id = 1,
                Surname = "Шахабов",
                Name = "Адам",
                SecondName = "Хаважиевич",
                SchoolId = "0286",
            };

            var result = projectParticipV2Repository.GetAll().Single(x => x.Id == 1);
            projectParticipV2Repository.Delete(result);

            mockContext.Object.ProjectParticipsV2.ToList().Remove.Remove(result);
            var e = mockContext.Object.ProjectParticipsV2.Single(x => x.Id == 1);
            var result2 = projectParticipV2Repository.GetAll().Single(x => x.Id == 1);

            //Assert
            Assert.IsNull(result2);

        }

        [TestMethod]
        public void UpdateTest()
        {
            //Arrange
            var entities = new List<ProjectParticipsV2>
            {
                new ProjectParticipsV2
                {
                    Id = 1,
                    ProjectCode = 201677,
                    ParticipCode = "null",
                    Surname = "Шахабов",
                    Name = "Адаму",
                    SecondName = "Хаважиевич",
                    SchoolId = "0286",
                    ClassCode = "0100"
                },
                new ProjectParticipsV2
                {
                    Id = 2,
                    ProjectCode = 201677,
                    ParticipCode = "null",
                    Surname = "Муциев",
                    Name = "Адлан",
                    SecondName = "Русланович",
                    SchoolId = "0286",
                    ClassCode = "0100"
                },
            }.AsQueryable();
            var mockEntitySetHandler = new MockTSetCreator<ProjectParticipsV2>();
            var mockEntitySet = mockEntitySetHandler.FactoryMethod(entities);

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ProjectParticipsV2).Returns(mockEntitySet.Object);
            mockContext.Setup(x => x.Set<ProjectParticipsV2>()).Returns(mockEntitySet.Object);

            var mockClassService = new Mock<IClassService>();
            mockClassService.Setup(x => x.GetId("1 А")).Returns("0101");

            var unitOfWork = new UnitOfWorkV2(mockContext.Object);
            var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);

            //Act
            var service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, mockClassService.Object);
            var dto = new ProjectParticipV2Dto
            {
                Id = 1,
                Surname = "Шахабов",
                Name = "Адам",
                SecondName = "Хаважиевич",
                SchoolId = "0286",
            };

            service.Update(dto);
            var result = projectParticipV2Repository.GetAll().Where(x => x.Id == 1).Single();

            //Assert
            Assert.AreEqual("Адам", result.Name);

        }
    }
}
