﻿using System.Collections.Generic;
using System.IO;

namespace Monit95App.Services.File
{
    public interface IFileService
    {
        int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, FileAddingOptions options);

        int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, IEnumerable<UserPermission> accesses, FileAddingOptions options);

        string GetFileBase64String(int fileId);

        string GetFileBase64String(int fileId, string userName);

        FileStream GetFileStream(int fileId);

        FileStream GetFileStream(int fileId, string userName);

        void Delete(int fileId, string userName);

        string ConvertTiffToJpegBase64(string tiffFilePath);

        string ConvertTiffToJpegBase64(FileStream tiffFileStream);

        bool CheckIfFileExists(string hash, int repositoryId);
    }
}