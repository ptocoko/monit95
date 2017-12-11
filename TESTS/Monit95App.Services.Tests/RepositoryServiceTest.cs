using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.File;
using NSubstitute;
using File = Monit95App.Domain.Core.Entities.File;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RepositoryServiceTest
    {
        [TestMethod]
        public void AddTest()
        {
            // Arrange
            var fakeRsurTestList = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    RsurParticipTest = new RsurParticipTest
                    {
                        RsurParticip = new RsurParticip
                        {
                            School = new Domain.Core.Entities.School
                            {
                                AreaCode = 201
                            }
                        },
                        RsurTest = new RsurTest
                        {
                            IsOpen = true
                        }
                    },
                    File = new File
                    {
                        HexHash = "E018AB91DC96E2BB07D6EBD097D4779D"
                    }

                }
            }.AsQueryable();
            var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Expression.Returns(fakeRsurTestList.Expression);

            var mockFileSet = Substitute.For<DbSet<File>, IQueryable<File>>();

            Directory.CreateDirectory(@"c:\repositories\2");
            var fakeStream = new MemoryStream(Encoding.UTF8.GetBytes("fake"));
            var mockContext = Substitute.For<CokoContext>();           
            
            // Config mockContext
            mockContext.RsurTestResults.Returns(mockRsurTestResultSet);
            mockContext.Files.Returns(mockFileSet);

            // Act
            var service = new RepositoryService(mockContext);
            var result = service.Add(2, fakeStream, @"c:\images\IMG-2017-12-07.JPG", "201");
            var result2 = fakeRsurTestList.First();

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void DeleteTest()
        {
            // Arrange
            // Mocking DbSet<File>
            var fakeFiles = new List<File>
            {
                new File
                {
                    Id = 1,
                    FilePermissonList = new List<FilePermisson>
                    {
                        new FilePermisson
                        {
                            UserName = "201",
                            PermissionId = 2
                        }
                    }
                }
            }.AsQueryable();
            var mockFileSet = Substitute.For<DbSet<File>, IQueryable<File>>();
            ((IQueryable<File>)mockFileSet).Expression.Returns(fakeFiles.Expression);
            ((IQueryable<File>)mockFileSet).Provider.Returns(fakeFiles.Provider); // SingOrDefault                  

            // Mocking CokoContext            
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.Files.Returns(mockFileSet);

            // Act
            var service = new RepositoryService(mockCokoContext);
            var result = service.Delete(1, "201");

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
