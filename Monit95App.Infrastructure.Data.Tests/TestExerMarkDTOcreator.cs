using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Models;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    /// <summary>
    /// Сводное описание для TestExerMarkDTOcreator
    /// </summary>
    [TestClass]
    public class TestExerMarkDTOcreator
    {
        public TestExerMarkDTOcreator()
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
        public void TestFactoryMethod()
        {
            //Assert
            var participTest1 = new ParticipTest
            {
                ExerMarks = new List<ExerMark>
                {
                    new ExerMark { ExerNumber = 1, Mark = 0, TestExercis = new TestExercis { ExerMaxMark = 1} }
                }
            };

            var participTest2 = new ParticipTest
            {
                ProjectTest = new ProjectTest
                {
                    Test = new Test
                    {
                        TestExercises = new List<TestExercis>
                        {
                            new TestExercis { ExerNumber = 1, ExerMaxMark = 1 }
                        }
                    }
                }
            };

            //Act
            var exerMarkDTOcreator = new ExerMarkDTOcreator();
            var result1 = exerMarkDTOcreator.FactoryMethod(participTest1);
            var result2 = exerMarkDTOcreator.FactoryMethod(participTest2);

            var result2Object = result2.FirstOrDefault();

            //Assert
            Assert.AreEqual(1, result2Object.ExerNumber);
            Assert.IsNotNull(result1);
            Assert.IsNotNull(result2);

        }
    }
}
