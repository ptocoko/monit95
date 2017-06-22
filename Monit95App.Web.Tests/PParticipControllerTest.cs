using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Api;
using Moq;
using System.Data.Entity;
using System.Linq;
using Monit95App.Models;
using Monit95App.Infrastructure.Data.Tests;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Web.Tests
{
	/// <summary>
	/// Сводное описание для TestParticipsController
	/// </summary>
	[TestClass]
	public class PParticipControllerTest
	{
        [TestMethod]
        public void TestPostParticip()
        {
            //Arrange
            //mocking PParticips
            var pparticipList = new List<ProjectParticip>
            {
                new ProjectParticip { ParticipCode = "2016-205-011", School = new School { AreaCode = 205 } },
                new ProjectParticip { ParticipCode = "2016-206-001", School = new School { AreaCode = 206 } },
                new ProjectParticip { ParticipCode = "2016-206-002", School = new School { AreaCode = 206 } },
                new ProjectParticip { ParticipCode = "2016-206-004", School = new School { AreaCode = 206 } },
            };
            var mockPParticipSetHandler = new MockTSetCreator<ProjectParticip>();
            var mockPParticipSet = mockPParticipSetHandler.FactoryMethod(pparticipList);

            //mocking Schools
            var schoolList = new List<School>
            {
                new School { Id = "0053", AreaCode = 206 }
            }.AsQueryable();
            var mockSchoolSetHandler = new MockTSetCreator<School>();
            var mockSchoolSet = mockSchoolSetHandler.FactoryMethod(schoolList);
            //configure Find()
            mockSchoolSet.Setup(x => x.Find(It.IsAny<object[]>()))                   
                .Returns<object[]>(x => schoolList.FirstOrDefault(y => y.Id == x[0]));         

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ProjectParticips).Returns(mockPParticipSet.Object);
            mockContext.Setup(x => x.Schools).Returns(mockSchoolSet.Object);

            var uow = new UnitOfWork(mockContext.Object);
            //Act
            var pparticipConroller = new ProjectParticipController(mockContext.Object, new PParticipCodeCreator(mockContext.Object), new PParticipViewer());
            var postResult = pparticipConroller.PostParticip(new ProjectParticip
            {
                Surname = "Шахабов",
                Name = "Адам",
                SecondName = "Хаважиевич",
                NSubjectCode = 2,
                SchoolId = "0053",
                CategId = 1,
                Experience = 0,
                Phone = "8 (928) 016-83-96",
                Email = "theadamo86@gmail.com",
                School = new School { Id = "0053", Name = "СОШ" },
                Category = new Category { Id = 1, Name = "Первая категория" },
                NsurSubject = new NsurSubject { Code = 1, Name = "Русский язык" }
            });

            //Assert
            Assert.IsNotNull(postResult);            
        }
        public PParticipControllerTest()
		{
			//
			// TODO: добавьте здесь логику конструктора
			//
		}

		private TestContext testContextInstance;

		/// <summary>
		///Получает или устанавливает контекст теста, в котором предоставляются
		///сведения о текущем тестовом запуске и обеспечивается его функциональность.
		///</summary>
		public TestContext TestContext
		{
			get
			{
				return testContextInstance;
			}
			set
			{
				testContextInstance = value;
			}
		}

		#region Дополнительные атрибуты тестирования
		//
		// При написании тестов можно использовать следующие дополнительные атрибуты:
		//
		// ClassInitialize используется для выполнения кода до запуска первого теста в классе
		// [ClassInitialize()]
		// public static void MyClassInitialize(TestContext testContext) { }
		//
		// ClassCleanup используется для выполнения кода после завершения работы всех тестов в классе
		// [ClassCleanup()]
		// public static void MyClassCleanup() { }
		//
		// TestInitialize используется для выполнения кода перед запуском каждого теста 
		// [TestInitialize()]
		// public void MyTestInitialize() { }
		//
		// TestCleanup используется для выполнения кода после завершения каждого теста
		// [TestCleanup()]
		// public void MyTestCleanup() { }
		//
		#endregion

		[TestMethod]
		public void TestGetAreaParticips()
		{

            //var testParticipRepository = new TestParticipRepository();
            //var participsController = new PParticipController(testParticipRepository.mockParticipRepository.Object);
            //var particips = participsController.GetAreaParticips(206);

            //Assert
            //Assert.IsNotNull(particips);
            //
            // TODO: добавьте здесь логику теста
            //
        }
	}
}
