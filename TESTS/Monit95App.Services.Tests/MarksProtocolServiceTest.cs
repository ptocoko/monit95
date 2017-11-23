using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Collections.Generic;
using Monit95App.Domain.Core.Entities;
using System.Linq;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class MarksProtocolServiceTest
    {
        [TestMethod]
        public void GetTest()
        {                        
            // Arrange
            var jArray = JArray.Parse(System.IO.File.ReadAllText($@"{Directory.GetCurrentDirectory()}\json-mock\RsurParticipTestResults.json"));
            var l = jArray.ToObject<List<RsurTestResult>>();

            foreach(var item in l)
            {
                Console.WriteLine(item.Grade5);
            }

            // Act
            var result = l.Single(x => x.RsurParticipTest.RsurParticip.Code == 10928);

            // Assert
            
        }
    }
}
