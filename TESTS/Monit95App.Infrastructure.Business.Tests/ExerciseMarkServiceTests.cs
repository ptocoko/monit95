using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Models;
using Monit95App.Services;
using NSubstitute;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ExerciseMarkServiceTests
    {
        [TestMethod]
        public async Task AddAsyncTest()
        {
            var mockInModel = new ExerciseMarkModel
            {                
                ProjectParticipId = 1018,
                TestId = "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1",
                Marks = "1;0;0;1"
            };
            var mockOutModel = new ExerciseMarkModel
            {
                Id = 11,
                ProjectParticipId = 1018,
                TestId = "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1",
                Marks = "1;0;0;1"                                                
            };

            var mockEntity = new ExerciseMark
            {                
                ProjectParticipId = 1018,
                TestId = new Guid("C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1"),
                Marks = "1;0;0;1"
            };

            var unitOfWork = new UnitOfWork(new cokoContext());
            var repository = new GenericRepository<ExerciseMark>(unitOfWork);
            var testRep = new GenericRepository<Test>(unitOfWork);
            
            //var mockExerciseMarkRepository = Substitute.For<IGenericRepository<ExerciseMark>>();
            var mockUnitOfWork = Substitute.For<IUnitOfWork>();
            var mockExerciseMarkRepository = Substitute.For<IGenericRepository<ExerciseMark>>();
            var service = new ExerciseMarkService(mockUnitOfWork, mockExerciseMarkRepository);

            //Act
            var resultModel = await service.AddAsync(mockInModel);

            //Assert
            Assert.IsNotNull(resultModel);
            mockExerciseMarkRepository.Received().Insert(Arg.Any<ExerciseMark>());
            mockUnitOfWork.Received().Save();     
        }
    }
}