using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System.Linq;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class FilesService_Tests
    {
        const string folderWithFiles = "C:\\repositories\\tests";
        const string distFolder = "C:\\repositories\\tests_dist";

        [TestMethod]
        public void DeleteDuplicates()
        {
            var actual = FilesService.GetNonDuplicateFiles(Directory.GetFiles(folderWithFiles), distFolder);

            var expected = 3;

            Assert.AreEqual(expected, actual.Count());
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void GetNonDuplicates_WhenDistFolderNotExist()
        {
            var actual = FilesService.GetNonDuplicateFiles(Directory.GetFiles(folderWithFiles), $"{distFolder}\\im_not_exist");
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void GetNonDuplicates_WhenFilesNotExist()
        {
            var actual = FilesService.GetNonDuplicateFiles(new string[] { $"{folderWithFiles}\\im_not_exist_file.png" }, distFolder);
        }
    }
}
