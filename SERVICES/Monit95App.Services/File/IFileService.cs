﻿using System.IO;
using ServiceResult;

namespace Monit95App.Services.File
{
    public interface IFileService
    {
        ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string userName);
        ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName);
        VoidResult Delete(int fileId);
        VoidResult Delete(int fileId, string userName);
        ServiceResult<string> GetFileName(int fileId, string destHostFolder, string userName);
        ServiceResult<FileStream> GetFileContent(int fileId, string userName);
    }
}