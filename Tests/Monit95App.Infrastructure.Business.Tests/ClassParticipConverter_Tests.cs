using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services;
using System.Collections.Generic;
using System.Linq;

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
            _converter = new ClassParticipConverter();

            var actual = _converter.ConvertToParticipDto(mockClassParticip, "0000", 201767);

            Assert.IsNotNull(actual);
            Assert.AreEqual("0000", actual.SchoolId);
            Assert.AreEqual(201767, actual.ProjectCode);
        }

        [TestMethod]
        public void ConvertToParticipsDto_TestWhenListOfParticips()
        {
            var mockClassParticips = new List<ClassParticip>
            {
                new ClassParticip
                {
                    Surname = "Эсамбаев",
                    Name = "Хусайн",
                    SecondName = "Арбиевич",
                    ClassName = "1"
                },
                new ClassParticip
                {
                    Surname = "Эсамбаев",
                    Name = "Хусайн",
                    SecondName = "Арбиевич",
                    ClassName = "1A"
                }
            };
            _converter = new ClassParticipConverter();

            var actual = _converter.ConvertToParticipDto(mockClassParticips, "0000", 201767);

            Assert.AreEqual(2, actual.Count());
            Assert.AreEqual("1A", actual.Skip(1).First().ClassName);
        }
    }
}
