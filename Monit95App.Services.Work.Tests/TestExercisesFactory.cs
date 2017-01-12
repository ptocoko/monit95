using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Work.Concrete;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Services.Work.Tests
{
    [TestClass]
    public class TestExercisesFactory
    {
        [TestMethod]
        public void TestCreateExercise()
        {
            // Arrange    
            string[] strArray = new string[] { "1(1);1(1);1(2)", "0(1);1(1);0(2)" };

            //Act
            ExercisesFactory factory = new ExercisesFactory();
            var exerciseList = factory.Create(strArray);

            // Assert
            Assert.IsNotNull(exerciseList);
            Assert.AreEqual(3, exerciseList.Count);
            Assert.AreEqual(1, exerciseList.Count(x => x.Number == 1)); //amount 0f first exercise
            Assert.AreEqual(1, exerciseList.Count(x => x.Number == 2)); //amount 0f second exercise

        }
    }
}

//double percentdOfFirstExer = Math.Round(exerciseList.Find(x => x.Number == 1).Results.Sum(x => x.Value) / 2, 3);
//double percentdOfSecondExer = Math.Round(exerciseList.Find(x => x.Number == 2).Results.Sum(x => x.Value) / 2, 3);

//Assert.AreEqual(0.500, percentdOfFirstExer);
//            Assert.AreEqual(1.000, percentdOfSecondExer);