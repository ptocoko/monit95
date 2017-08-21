using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class ClassParticipConverter_Tests
    {
        ClassParticipConverter _converter;
        
        [TestMethod]
        public void ConvertToParticipDto_Test()
        {
            var mockClassParticip = new ClassParticip
            {
                Surname = "Эсамбаев",
                Name = "Хусайн",
                SecondName = "Арбиевич",
                ClassName = "1"
            };
            _converter = new ClassParticipConverter("0000", 201767);

            var actual = _converter.ConvertToParticipDto(mockClassParticip);

            Assert.IsNotNull(actual);
            Assert.AreEqual("0000", actual.SchoolId);
            Assert.AreEqual(201767, actual.ProjectCode);
        }
    }
}
