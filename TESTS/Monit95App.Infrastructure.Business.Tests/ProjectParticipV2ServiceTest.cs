using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using Moq;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class ProjectParticipV2ServiceTest
    {
        [TestMethod]
        public async void AddAsync()
        {
            var dto = new ParticipModel
            {
                ProjectCode = 201661,
                Surname = "Testu",
                Name = "test",
                SecondName = "test",
                SchoolId = "0005",
                ClassName = "1 А"
            };

            var mockClassService = new Mock<IClassService>();
            mockClassService.Setup(x => x.GetId("1 А")).Returns("0101");
            var unitOfWork = new UnitOfWork(new cokoContext());
            var projectParticipV2Repository = new GenericRepository<ProjectParticipsV2>(unitOfWork);
            var service = new ParticipService(unitOfWork, projectParticipV2Repository, mockClassService.Object);

            //Create
            var addedDto = await service.AddAsync(dto);            
            Assert.IsTrue(addedDto.Id != 0); //assert

            //Update
            addedDto.Surname = "Test";
            await service.UpdateAsync(addedDto);
            var updatedEntity = projectParticipV2Repository.GetById(addedDto.Id);
            Assert.IsTrue(updatedEntity.Surname == "Testu");
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
