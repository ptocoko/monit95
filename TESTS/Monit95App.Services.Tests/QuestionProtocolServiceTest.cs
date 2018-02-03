using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.ItakeEge.QuestionProtocol;
using Monit95App.Services.ItakeEge.QuestionResult;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class QuestionProtocolServiceTest
    {
        [TestMethod]
        public void CreateTest()
        {
            //ИНТЕГРАЦИОННЫЙ ТЕСТ
            // Arrange

            string schoolid = "0005";
            var cokoContext = new CokoContext();
            var participTest = new ParticipTest
            {
                Particip = new Particip
                {
                    SchoolId = "0005",
                    Surname = "test",
                    Name = "test",
                    DocumNumber = 12345,
                    ProjectId = 2013
                }
            };
            cokoContext.ParticipTests.Add(participTest);
            cokoContext.SaveChanges();

            // Act
            var orderMarkDict = new Dictionary<int, double>()
            {
                { 1, 1 },
                { 2, 1 },
                { 3, 1 },
                { 4, 1 },
                { 5, 1 },
                { 6, 1 },
                { 7, 1 },
                { 8, 1 },
                { 9, 1 },
                { 10, 1 },
                { 11, 1 },
                { 12, 1 },
                { 13, 1 },
                { 14, 1 },
                { 15, 1 },
                { 16, 1 },
                { 17, 1 },
                { 18, 1 },
                { 19, 1 },
                { 20, 1 },
                { 21, 1 },
                { 22, 1 },
                { 23, 1 },
                { 24, 1 },
                { 25, 1 }
            };
            var questionProtocolService = new QuestionProtocolService(cokoContext);

            // Assert
        }
    }
}
