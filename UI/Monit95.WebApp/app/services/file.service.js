var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
var FileService = /** @class */ (function () {
    function FileService(http) {
        this.http = http;
        this.endpoint = '/api/repositories';
    }
    FileService.prototype.uploadFile = function (repositoryId, file, fileName, useHashAsFileName, checkIfFileExists) {
        if (useHashAsFileName === void 0) { useHashAsFileName = true; }
        if (checkIfFileExists === void 0) { checkIfFileExists = true; }
        var formData = new FormData();
        formData.append('file', file, fileName ? fileName : file.name);
        return this.http.post(this.endpoint + "/" + repositoryId + "/files", formData, {
            responseType: 'text',
            params: {
                'useHashAsFileName': "" + useHashAsFileName,
                'checkIfFileExists': "" + checkIfFileExists
            }
        });
    };
    FileService.prototype.getFileId = function (fileName, repositoryId) {
        var params = new HttpParams();
        params.append('filename', fileName);
        params.append('repositoryId', repositoryId.toString());
        return this.http.get('/api/files/' + fileName + '/' + repositoryId);
    };
    FileService.prototype.deleteFile = function (fileId) {
        return this.http.delete("api/files/" + fileId, { responseType: 'text' });
    };
    FileService.prototype.downloadFile = function (fileId, fileName) {
        this.http.get('/api/files/' + fileId, { responseType: 'blob' }).subscribe(function (file) {
            var url = window.URL.createObjectURL(file);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    };
    FileService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], FileService);
    return FileService;
}());
export { FileService };
var UploadFileOptions = /** @class */ (function () {
    function UploadFileOptions() {
        this.useHashAsFileName = true;
        this.checkIfFileExists = true;
    }
    return UploadFileOptions;
}());
export { UploadFileOptions };
//# sourceMappingURL=file.service.js.map