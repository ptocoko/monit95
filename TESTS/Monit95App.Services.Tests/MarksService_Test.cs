
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
