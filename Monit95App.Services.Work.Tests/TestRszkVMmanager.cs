using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Excel = Microsoft.Office.Interop.Excel;
using Moq;
using System.Collections;

namespace Monit95App.Domain.Work.Tests
{
    [TestClass]
    public class TestRszkVMmanager
    {
        public IEnumerator RowCollection()
        {
            Mock<Excel.Range> row1 = new Mock<Excel.Range>();
            Mock<Excel.Range> row1_cells = new Mock<Excel.Range>();
            Mock<Excel.Range> row1_cells_11 = new Mock<Excel.Range>();

            row1.Setup(y => y.Cells).Returns(row1_cells.Object);
            row1_cells.Setup(y => y[1, 1]).Returns(row1_cells_11.Object);
            row1_cells_11.Setup(y => y.Value2).Returns("1");

            yield return row1.Object;
            //yield return row2.Object;
        }

        [TestMethod]
        public void TestGetViewModel()
        {
            // Arrange            
            var moqRange = new Mock<Excel.Range>();
            moqRange.Setup(x => x.GetEnumerator()).Returns(RowCollection);
            //moqRange.As<IEnumerable>().Setup(x => x.GetEnumerator()).Returns(RowCollection());
            //Act
            //RSZKmodelManager_201638 manager = new RSZKmodelManager_201638(moqRange.Object);

            // Assert
            //Assert.IsNotNull(manager);
        }
    }
}