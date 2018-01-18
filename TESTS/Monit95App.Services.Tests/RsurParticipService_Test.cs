using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Monit95App.Services.Tests
{
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Linq;

    using Monit95App.Domain.Core.Entities;
    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur;
    using Monit95App.Services.Rsur.Particip;
    using NSubstitute;

    [TestClass]
    public class RsurParticipService_Test
    {
        private readonly CokoContext context = new CokoContext();

        [TestMethod]
        public void Update_TestOk()
        {
            // Arrange
            var entity = new RsurParticip { Code = 10_000, ActualCode = 1 };
            var mockContext = Substitute.For<CokoContext>();
            var mockParticips = Substitute.For<DbSet<RsurParticip>>();
            mockContext.RsurParticips.Returns(mockParticips);
            mockParticips.Find(10_000).Returns(entity);

            // Act
            var service = new RsurParticipService(mockContext);
            
            service.Update(10_000, new RsurParticipPutDto { ActualCode = 0 });

            // Assert
            Assert.IsTrue(entity.ActualCode == 0);
        }

        [TestMethod]
        public void GetAll_TestForSchool()
        {
            // Arrange
            var service = new RsurParticipService();

            // Act
            var dtos = service.GetAll(null, "0010");

            // Assert
            Assert.IsTrue(dtos.All(x => x.SchoolParticipInfo.SchoolName.Substring(0, 4) == "0010"));
        }

        [TestMethod]
        public void GetAll_TestForCoko()
        {
            // Arrange
            var service = new RsurParticipService();

            // Act
            var dtos = service.GetAll();

            // Assert
            Assert.IsTrue(dtos.Count() > 1_000);
        }

        [TestMethod]        
        public void GetByCode_TestMapping()
        {
            // Arrange
            var service = new RsurParticipService();

            // Act
            var dto = service.GetByCode(11000);

            // Assert
            Assert.AreEqual("0010 - МБОУ «Лицей № 1 им. Н.А. Назарбаева» г. Грозного", dto.SchoolParticipInfo.SchoolName);
            Assert.AreEqual("205 - г. Грозный", dto.AreaCodeWithName);
            Assert.AreEqual("Русский язык", dto.RsurSubjectName);
            Assert.AreEqual("Алиева", dto.SchoolParticipInfo.Surname);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void GetByCode_TestArgumentOutOfRangeException()
        {
            // Arrange
            var service = new RsurParticipService();

            // Act
            service.GetByCode(1);
        }

        [TestMethod]
        public void Add_Test()
        {       
            // Act
            var service = new RsurParticipService();
            var dto = new ParticipAddDto
                          {
                              Surname = "test",
                              Name = "...",
                              RsurSubjectName = 1,
                              CategoryId = 1,
                              Experience = 0,
                              Phone = "89280168396",
                              Email = "theadamo86@gmail.com",
                              Birthday = new DateTime(1986, 04, 22),
                              ClassNumbers = "1;2",
                              SchoolId = "0001"
                          };
            var code = service.Add(dto);            

            // Assert
            Assert.IsTrue(code > 0);
        }

        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void Add_ExceptValidateContextExceptionTest()
        {
            // Arrange
            var mockContext = Substitute.For<CokoContext>();
            var mockRsurParticips = Substitute.For<DbSet<RsurParticip>>();
            mockContext.RsurParticips.Returns(mockRsurParticips);

            // Act
            var service = new RsurParticipService();
            var dto = new ParticipAddDto
                          {
                              Surname = "test",
                              Name = "...",
                              RsurSubjectName = 1,
                              CategoryId = 1,
                              Experience = 0,
                              Phone = "892801683967",
                              Email = "theadamo86@gmail.com",
                              Birthday = new DateTime(1986, 04, 22),
                              ClassNumbers = "1;2",
                              SchoolId = "0001"
                          };
            var code = service.Add(dto);     
            
        }

        [TestCleanup]
        public void Cleanup()
        {
            var entities = this.context.RsurParticips.Where(x => x.Surname == "test").ToList();
            this.context.RsurParticips.RemoveRange(entities);

            this.context.SaveChanges();
        }
    }
}
