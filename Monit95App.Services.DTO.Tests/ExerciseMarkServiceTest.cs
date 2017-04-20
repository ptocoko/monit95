using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;

namespace Monit95App.Services.DTO.Tests
{
    [TestClass]
    public class ExerciseMarkServiceTest
    {
        [TestMethod]
        public async Task AddAsyncTest()
        {
            var newDto = new ExerciseMarkDto
            {
                Surname = "Test",
                Name = "test",
                SecondName = "test",
                ClassName = "1 А",
                Marks = "1;0;0;1",
                ProjectParticipId = 1018,
                TestId = new Guid("C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1")
            };

            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var repository = new Repository<ExerciseMark>(unitOfWork);
            var service = new ExerciseMarkService(unitOfWork, repository);

            //Act
            //await service.AddAsync(newDto);

            //Assert
            Assert.IsTrue(1 != 1);
        }
    }
}
