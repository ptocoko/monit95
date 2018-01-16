﻿using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.File;
using Monit95App.Services.Tests.Util;
using NSubstitute;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class FileServiceTests
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
                    File = new Domain.Core.Entities.File
                    {
                        HexHash = "E018AB91DC96E2BB07D6EBD097D4779D"
                    }

                }
            }.AsQueryable();
            var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Expression.Returns(fakeRsurTestList.Expression);

            var mockFileSet = Substitute.For<DbSet<Domain.Core.Entities.File>, IQueryable<Domain.Core.Entities.File>>();

            Directory.CreateDirectory(@"c:\repositories\2");
            var fakeStream = new MemoryStream(Encoding.UTF8.GetBytes("fakeBytes"));
            var mockContext = Substitute.For<CokoContext>();           
            
            // Config mockContext
            mockContext.RsurTestResults.Returns(mockRsurTestResultSet);
            mockContext.Files.Returns(mockFileSet);

            // mocking Monit95Users
            var monit95Users = new List<Monit95User>
            {
                new Monit95User { Login = "201" }
            };
            var mockUserSet = MockDbSet.GetMock(monit95Users);
            mockContext.Monit95Users.Returns(mockUserSet);

            // mocking Repositories
            var repositories = new List<Repository>
            {
                new Repository { Id = 2 }
            };
            var mockRepositorySet = MockDbSet.GetMock(repositories);
            mockContext.Repositories.Returns(mockRepositorySet);

            // mocking Files
            var files = new List<Domain.Core.Entities.File>
            {
                new Domain.Core.Entities.File
                {
                    HexHash = "E018AB91DC96E2BB07D6EBD097D4779D"
                }
            };
            var fileSet = MockDbSet.GetMock(files);
            mockContext.Files.Returns(fileSet);

            // Act
            var service = new File.FileService(mockContext);
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
            //var fakeFiles = new List<Domain.Core.Entities.File>
            //{
            //    new Domain.Core.Entities.File
            //    {
            //        Id = 1,
            //        FilePermissonList = new List<FilePermission>
            //        {
            //            new FilePermission
            //            {
            //                UserName = "201",
            //                PermissionId = 2
            //            }
            //        }
            //    }
            //}.AsQueryable();
            //var mockFileSet = Substitute.For<DbSet<Domain.Core.Entities.File>, IQueryable<Domain.Core.Entities.File>>();
            //((IQueryable<Domain.Core.Entities.File>)mockFileSet).Expression.Returns(fakeFiles.Expression);
            //((IQueryable<Domain.Core.Entities.File>)mockFileSet).Provider.Returns(fakeFiles.Provider); // SingOrDefault                  

            //// Mocking CokoContext            
            //var mockCokoContext = Substitute.For<CokoContext>();
            //mockCokoContext.Files.Returns(mockFileSet);

            //// Act
            //var service = new FileService(mockCokoContext);
            //var result = service.Delete(1, "201");

            // Assert
            Assert.Fail();
        }        

        [TestMethod]
        public void GetFileStreamTest()
        {
            // Arrange
            // Preparing file system
            Directory.CreateDirectory(@"c:\repositories\2");
            Directory.CreateDirectory(@"c:\repositories\4");
            var fs = System.IO.File.Create(@"c:\repositories\2\распределение_201.xlsx");
            var fs2 = System.IO.File.Create(@"c:\repositories\4\статистический отчет егэ-2017.pdf");
            fs.Close();
            fs2.Close();

            // Mocking FileSet
            var fakeFiles = new List<Domain.Core.Entities.File>
            {
                new Domain.Core.Entities.File
                {
                    FilePermissonList = new List<FilePermission>
                    {
                        new FilePermission
                        {
                            UserName = "201",
                            PermissionId = 1
                        }
                    },
                    Id = 1,
                    RepositoryId = 2,
                    Name = "распределение_{userName}.xlsx"
                },
                new Domain.Core.Entities.File
                {
                    FilePermissonList = new List<FilePermission>
                    {
                        new FilePermission
                        {
                            UserName = "202",
                            PermissionId = 1
                        }
                    },
                    Id = 2,
                    RepositoryId = 4,
                    Name = "статистический отчет егэ-2017.pdf"
                }
            }.AsQueryable();
            var mockFileSet = Substitute.For<DbSet<Domain.Core.Entities.File>, IQueryable<Domain.Core.Entities.File>>();
            ((IQueryable<Domain.Core.Entities.File>)mockFileSet).Expression.Returns(fakeFiles.Expression);
            ((IQueryable<Domain.Core.Entities.File>)mockFileSet).Provider.Returns(fakeFiles.Provider);

            // Mocking CokoContext
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.Files.Returns(mockFileSet);

            // Act 
            var fileServices = new FileService(mockCokoContext);
            var result1 = fileServices.GetFileStream(1, "201");
            var result2 = fileServices.GetFileStream(2, "202");

            // Assert
            Assert.IsNotNull(result1.Result);
            Assert.IsNotNull(result2.Result);

            // Clean fileSystem
            result1.Result.Close();
            result2.Result.Close();
            Directory.Delete(@"c:\repositories\2", true);
            Directory.Delete(@"c:\repositories\4", true);
        }

        [TestMethod]
        public void GetFileBase64String()
        {
            // ARRANGE
            // preparing file system
            Directory.CreateDirectory(@"c:\repositories\2");            
            var fs = System.IO.File.Create(@"c:\repositories\2\отчет.xlsx");    
            
            fs.Close();                      

            // mocking FileSet
            var fakeFiles = new List<Domain.Core.Entities.File>
            {
                new Domain.Core.Entities.File
                {
                    Id = 1,
                    RepositoryId = 2,
                    Name = "отчет.xlsx",
                    FilePermissonList = new List<FilePermission>
                    {
                        new FilePermission
                        {
                            UserName = "0001",
                            PermissionId = 1
                        }
                    }
                }
            };
            var mockFileSet = MockDbSet.GetMock(fakeFiles);

            // mocking CokoContext
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.Files.Returns(mockFileSet);

            // ACT
            var fileService = new FileService(mockCokoContext);
            var result = fileService.GetFileBase64String(1, "0001");

            // ASSERT            
            Assert.IsNotNull(result);           
        }

        [TestCleanup]
        public void CleanFileSystem()
        {
            Directory.Delete(@"c:\repositories", true);            
        }
    }
}
