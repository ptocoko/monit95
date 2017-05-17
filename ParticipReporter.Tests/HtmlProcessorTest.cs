using System;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ParticipReporter.Tests
{
    [TestClass]
    public class HtmlProcessorTest
    {
        [TestInitialize]
        public void TestInitialize()
        {
            //this.datasourceObject = new DatasourceObject("location-string");
            //this.datasourceObject.Connect();
        }

        [TestCleanup]
        public void TestCleanup()
        {
            //Clean enviroment
            Directory.Delete(@"c:\unittest", true);
        }

        [TestMethod]
        public void ProcessTest()
        {
            //Arrange
            string folder = @"c:\unittest";
            Directory.CreateDirectory(folder);
            var files = new []
            {
                @"c:\unittest\2016-205-001.html",
                @"c:\unittest\2016-205-002.html"
            };

            foreach (var file in files)
            {
                using (var sw = File.CreateText(file))
                {
                    sw.WriteLine("<html><head><title>Результаты</title><meta charset='UTF-8'></head><body></body></html>");
                }
            }            

            //Act
            var htmlProcessor = new HtmlProcessor(folder);
            htmlProcessor.Process();


            //Assert
            Assert.IsTrue(Directory.Exists(folder)); 
            Assert.IsTrue(File.Exists($@"{folder}\pdfs\2016-205-001.pdf"));
        }

    }
}
