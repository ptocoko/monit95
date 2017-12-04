
namespace Monit95App.Services.Tests
{
    // ReSharper disable StyleCop.SA1600
    // ReSharper disable StyleCop.SA1634
    // ReSharper disable StyleCop.SA1633
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    using NSubstitute;
    using Monit95App.Domain.Core.Entities;
    using Monit95App.Domain.Interfaces;

    [TestClass]
    public class MarksServiceTest
    {
        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void AddValidationExceptionTest()
        {
            // Arrange
            //var mockRepo = Substitute.For<IGenericRepository<Result>>();
            //var dto = new PostMarksDto
            //{
            //    ParticipTestId = 123,
            //    Marks = "1;0,5;"
            //};

            //// Act    
            //var service = new MarksService(mockRepo);
            //service.Add(dto);
        }

        [TestMethod]
        public void AddOkTest()
        {
            // Arrange
            //var mockRepo = Substitute.For<IGenericRepository<Result>>();
            //var dto = new PostMarksDto
            //{
            //    ParticipTestId = 123,
            //    Marks = "1;0,5"
            //};

            //// Act    
            //var service = new MarksService(mockRepo);
            //service.Add(dto);

            //// Assert
            //mockRepo.Received().Insert(Arg.Is<Result>(pr => pr.ParticipTestId == 123
            //                                             && pr.Marks == "1;0,5"));
        }

        [TestMethod]
        public void GetParticipMarksDtosTest()
        {
            // Arrange
            var mockResultRepo = Substitute.For<IGenericRepository<Result>>();
            var mockParticipRepo = Substitute.For<IGenericRepository<Particip>>();
            var mockParticipTestRepo = Substitute.For<IGenericRepository<ParticipTest>>();

            var participTests = new List<ParticipTest>
            {
                new ParticipTest
                {
                    Id = 1,
                    ProjectTestId = 1,
                    ParticipId = 21,
                    Particip = new Particip
                    {
                        SchoolId = "0001"
                    }
                },
                new ParticipTest
                {
                    Id = 2,
                    ProjectTestId = 1,
                    ParticipId = 12,
                    Particip = new Particip
                    {
                        SchoolId = "0001"
                    }
                }
            }.AsQueryable();

            var particips = new List<Particip>
            {
                new Particip
                {
                    Id = 12,
                    Surname = "Esambaev",
                    Name = "Husain",
                    SecondName = "Arbievich",
                    Class = new Class
                    {
                        Name = "1 B"
                    },
                    SchoolId = "0001"
                },
                new Particip
                {
                    Id = 21,
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SecondName = "...",
                    Class = new Class
                    {
                        Name = "1 A"
                    },
                    SchoolId = "0001"
                }
            }.AsQueryable();

            var results = new List<Result>
            {
                new Result
                {
                    ParticipTestId = 1,
                    Marks = "1;2;3"
                }
            }.AsQueryable();
            mockParticipTestRepo.GetAll().Returns(participTests);
            mockParticipRepo.GetAll().Returns(particips);
            mockResultRepo.GetAll().Returns(results);
            // Act
            var service = new MarksService(mockResultRepo, mockParticipRepo, mockParticipTestRepo);
            var dto = service.GetParticipMarksDtos(1, "0001");

            // Assert
            Assert.AreEqual(2, dto.Count());
            Assert.IsNull(dto.Single(p => p.ParticipTestId == 2).Marks);
            Assert.AreEqual("1;2;3", dto.Single(p => p.ParticipTestId == 1).Marks);
        }

        [TestMethod]
        public void UpdateTest()
        {
            // Arrange            
            //var mockRepo = Substitute.For<IGenericRepository<Result>>();
            //var entity = new Result
            //{
            //    ParticipTestId = 1,
            //    Marks = "1;2;3"                
            //};
            //mockRepo.GetById(1).Returns(entity);

            //// Act
            //var dto = new PutMarksDto
            //{
            //    Marks = "1;2;4,6"
            //};
            //var service = new MarksService(mockRepo);
            //service.Update(1, dto);

            //// Assert
            //mockRepo.Received().Update(Arg.Is<Result>(x => x.Marks == "1;2;4,6"));
        }
    }
}
