using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ParticipReporter;

namespace Monit95.ParticipReporter.Tests
{
    [TestClass]
    public class HtmlBuilderTests
    {
        HtmlBuilder builder;

        [TestInitialize]
        public void Init()
        {
            var heading = new HeadingDto
            {
                Fio = "Esambaev Hus Arb",
                SchoolName = "Coolest school EVER",
                ClassName = "1 A",
                TestName = "mathematics",
                TestDate = "18 april 2018"
            };

            var overview = new OverviewDto
            {
                DoneTasks = 1,
                AllTasks = 2,
                GradeStr = "whatever the coolest",
                Grade5 = 5
            };

            var elementsDto = new List<QuestionsDto>()
            {
                new QuestionsDto
                {
                    ElementName = "Element first",
                    Grade100 = 70,
                    Part = "Основная часть"
                },
                new QuestionsDto
                {
                    ElementName = "Element second",
                    Grade100 = 30,
                    Part = "Основная часть"
                },
                new QuestionsDto
                {
                    ElementName = "Element third",
                    Grade100 = 100,
                    Part = "Дополнительная часть"
                }
            };

            builder = new HtmlBuilder(new ReportDto { QuestionsDto = elementsDto, HeadingDto = heading, OverviewDto = overview });
        }

        [TestMethod]
        public void TestMethod1()
        {
            var report = builder.GetReport();

            Assert.IsTrue(true);
        }
    }
}
