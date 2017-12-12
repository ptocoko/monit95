using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RatingServiceTest
    {
        [TestMethod]
        public void CreateRatingsTest()
        {
            // Arrange
            var service = new RatingService(new CokoContext());

            // Act
            var result = service.CreateRatings(201);
            var result_0156 = result.Single(x => x.SchoolName == "МБОУ «СОШ № 1 с. Валерик»" && x.SubjectName == "Русский язык");            
            var result_0364 = result.Single(x => x.SchoolName == "МБОУ «СОШ с. Давыденко»" && x.SubjectName == "Русский язык");

            // Assert
            Assert.AreEqual(60.0, result_0156.PercentPassFirstTest);
            Assert.AreEqual(0.0, result_0156.PercentPassSecondTest);

            Assert.AreEqual(50.0, result_0364.PercentPassFirstTest);
            Assert.AreEqual(0.0, result_0364.PercentPassSecondTest);
        }
    }
}
