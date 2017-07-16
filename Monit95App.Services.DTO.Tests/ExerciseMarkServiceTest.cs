using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Models;
using Monit95App.Services;

namespace Monit95App.Domain.DTO.Tests
{
    [TestClass]
    public class ExerciseMarkServiceTest
    {
        [TestMethod]
        public async Task AddAsyncTest()
        {
            var newDto = new ExerciseMarkModel
            {              
                Marks = "1;0;0;1",
                ProjectParticipId = 1018,
                TestId = "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1"
            };

            var unitOfWork = new UnitOfWork(new cokoContext());
            var repository = new GenericRepository<ExerciseMark>(unitOfWork);
            var testRep = new GenericRepository<Test>(unitOfWork);
            var service = new ExerciseMarkService(unitOfWork, repository, testRep);

            //Act
            //await service.AddAsync(newDto);

            //Assert
            Assert.Fail();
        }
    }
}
