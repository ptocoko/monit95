using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using Moq;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class ParticipServiceTest
    {
        [TestMethod]
        public void Add_Test()
        {
            //Arrange
            var mockClassService = Substitute.For<IClassService>();
            mockClassService.GetId("1 А").Returns("0101");            
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>(); 
            var service = new ParticipService(mockParticipRepository, mockClassService);

            //Act
            var dto = new ParticipModel
            {
                ProjectCode = 201661,
                Surname = "Testu",
                Name = "test",
                SecondName = "test",
                SchoolId = "0005",
                ClassName = "1 А"
            };
            var addedDto = service.Add(dto);

            //Assert            
            Assert.AreEqual("0005", addedDto.SchoolId);
        }

        [TestMethod]
        public void GetBySchoolId_Test()
        {
            //Arrange
            var mockGetAllQuery = new List<Particip>
            {
                new Particip
                {
                    Surname = "Testu",
                    Name = "test",
                    SecondName = "test",
                    SchoolId = "0005"
                },
                new Particip
                {
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0001"
                }
            }.AsQueryable();
            var mockClassService = Substitute.For<IClassService>();                        
            var mockParticipRepository = Substitute.For<IGenericRepository<Particip>>();
            mockParticipRepository.GetAll().Returns(mockGetAllQuery);
            var service = new ParticipService(mockParticipRepository, mockClassService);

            //Act          
            var models = service.GetBySchoolId("0005");

            //Assert            
            Assert.AreEqual(1, models.Count());
        }

        [TestMethod]
        public void UpdateTest()
        {
            //var dto = new ProjectParticipV2Dto
            //{
            //    Id = ""
            //    ProjectCode = 201661,
            //    Surname = "Test",
            //    Name = "test",
            //    SecondName = "test",
            //    SchoolId = "0005",
            //    ClassName = "1 А"
            //};

            //var mockClassService = new Mock<IClassService>();
            //mockClassService.Setup(x => x.GetId("1 А")).Returns("0101");
            //var unitOfWork = new UnitOfWorkV2(new cokoContext());
            //var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);
            //var service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, mockClassService.Object);

            //var result = service.AddAsync(dto);

            ////Assert
            //Assert.IsTrue(result.Id != 0);
        }

        [TestMethod]
        public void DeleteTest()
        {            

        }

        
    }
}
