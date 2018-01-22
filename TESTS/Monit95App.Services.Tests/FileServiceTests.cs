using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.File;
using Monit95App.Services.Tests.Util;
using NSubstitute;
using Entities = Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class FileServiceTests
    {
        [TestMethod]
        public void ConvertTiffToJpegBase64Test()
        {

        }

        [TestMethod]
        public void AddTest()
        {                      
            Directory.CreateDirectory(@"c:\repositories\2");
            var fakeStream = new MemoryStream(Encoding.UTF8.GetBytes("fakeBytes"));
                                             
            // mocking Monit95Users
            var monit95Users = new List<Monit95User>
            {
                new Monit95User { Login = "201" }
            };
            var mockUserSet = MockDbSet.GetMock(monit95Users);            

            // mocking Repositories
            var repository2 = new Repository
            {
                Path = @"c:\repositories\2"
            };
            var repositories = new List<Repository>();
            repositories.Add(item: repository2);
            var mockRepositorySet = MockDbSet.GetMock(repositories);
            mockRepositorySet.Find(2).Returns(repository2);

            // mocking Files
            var files = new List<Domain.Core.Entities.File>
            {
                new Domain.Core.Entities.File
                {
                    HexHash = "E018AB91DC96E2BB07D6EBD097D4779D"
                }
            };
            var fileSet = MockDbSet.GetMock(files);

            // mocking CokoContext
            var mockContext = Substitute.For<CokoContext>();
            mockContext.Monit95Users.Returns(mockUserSet);           
            mockContext.Repositories.Returns(mockRepositorySet);           
            mockContext.Files.Returns(fileSet);

            // ACT
            var service = new FileService(mockContext);
            var result = service.Add(2, fakeStream, @"c:\images\IMG-2017-12-07.JPG", "201");            

            // Assert
            Assert.IsNotNull(result);            
        }

        [TestMethod]
        public void DeleteTest()
        {
            // ARRANGE            
            var repositoryPath = @"c:\repositories\2";
            var filePath = @"c:\repositories\2\foto.jpg";
            Directory.CreateDirectory(repositoryPath);
            var fs = System.IO.File.Create(filePath);            
            fs.Close();            

            // Mocking FileSet
            var fakeFiles = new List<Entities.File>
            {
                new Entities.File
                {
                    Repository = new Repository
                    {
                        Path = repositoryPath
                    },
                    Name = "foto.jpg",
                    Id = 1,
                    FilePermissonList = new List<FilePermission>
                    {
                        new FilePermission
                        {
                            UserName = "201",
                            PermissionId = 2
                        }
                    }
                }
            };
            var mockFileSet = MockDbSet.GetMock(fakeFiles);

            // Mocking CokoContext            
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.Files.Returns(mockFileSet);

            // Act
            var fileService = new FileService(mockCokoContext);
            fileService.Delete(1, "201");

            // ASSERT        
            Assert.IsNotNull(System.IO.File.Exists(filePath));
            // Clean fileSystem            
            Directory.Delete(repositoryPath, true);            
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
            Assert.IsNotNull(result1);
            Assert.IsNotNull(result2);

            // Clean fileSystem
            result1.Close();
            result2.Close();
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
                    },
                    Repository = new Repository
                    {
                        Path = @"c:\repositories\2\"
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

        //[TestCleanup]
        //public void CleanFileSystem()
        //{
        //    Directory.Delete(@"c:\repositories", true);            
        //}

        [TestMethod]
        public void ConvertTiffToJpegBase64()
        {
            var service = new FileService();
            var assembly = Assembly.GetAssembly(service.GetType());
            int countOfDirectoriesToMockResources = Environment.CurrentDirectory.Split('\\').Length;
            var path = Environment.CurrentDirectory
                .Split('\\')
                .Take(countOfDirectoriesToMockResources - 4)
                .Aggregate((a, b) => $"{a}\\{b}") 
                + "\\SERVICES\\Monit95App.Services\\Resource\\mock-tiff.tif";

            string actualBase64StringFromStream;
            string actualBase64StringFromPath;
            using(FileStream fs = new FileStream(path, FileMode.Open))
            {
                actualBase64StringFromStream = service.ConvertTiffToJpegBase64(fs);
            }
            actualBase64StringFromPath = service.ConvertTiffToJpegBase64(path);
            
            Assert.IsNotNull(actualBase64StringFromStream);
            Assert.IsNotNull(actualBase64StringFromPath);
            Assert.AreEqual(actualBase64StringFromStream, actualBase64StringFromPath);
        }
    }
}
