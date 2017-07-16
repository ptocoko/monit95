using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services;
using System.Collections;

namespace Monit95App.Domain.Work.Tests
{
    [TestClass]
    public class TestIMarks
    {
        MarksFormat1 ob1 = new MarksFormat1();
        MarksFormat2 ob2 = new MarksFormat2();
        string[] expectedMarksArray = new string[] { "0,5;1;1", "1;2;1" };

        [TestMethod]
        public void TestMarksFormat1_GetMarks()
        {
            //arrange
            string[] inMarksArray = new string[] { "0,5(2);1(2);1(1)", "1(2);2(2);1(1)" };

            //act
            var actualMarks = (ICollection)ob1.GetMarks(inMarksArray);
            //assert
            CollectionAssert.AreEqual(expectedMarksArray, actualMarks);
        }

        [TestMethod]
        public void TestMarksFormat2_GetMarks()
        {
            //arrange
            string[] inMarksArray = new string[] { "0,5;1;1|2;2;1", "1;2;1|2;2;1" };

            //act
            //assert
            var actualMarks = (ICollection)ob2.GetMarks(inMarksArray);                        
            CollectionAssert.AreEqual(expectedMarksArray, actualMarks);            
        }

        
    }
}
