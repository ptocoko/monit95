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
        public void AddAsync()
        {
            var dto = new ProjectParticipV2Dto
            {
                ProjectCode = 201661,
                Surname = "Test",
                Name = "test",
                SecondName = "test",
                SchoolId = "0005",
                ClassName = "1 А"
            };

            var mockClassService = new Mock<IClassService>();
            mockClassService.Setup(x => x.GetId("1 А")).Returns("0101");
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);
            var service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, mockClassService.Object);

            var result = service.AddAsync(dto);

            //Assert
            Assert.IsTrue(result.Id != 0);

        }

        [TestMethod]
        public void DeleteTest()
        {            

        }

        [TestMethod]
        public void UpdateTest()
        {            

        }
    }
}
