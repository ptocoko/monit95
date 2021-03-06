"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileOptions = exports.FileService = void 0;
var tslib_1 = require("tslib");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
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
        return this.http.post("".concat(this.endpoint, "/").concat(repositoryId, "/files"), formData, {
            responseType: 'text',
            params: {
                'useHashAsFileName': "".concat(useHashAsFileName),
                'checkIfFileExists': "".concat(checkIfFileExists)
            }
        });
    };
    FileService.prototype.getFileId = function (fileName, repositoryId) {
        var params = new http_1.HttpParams();
        params.append('filename', fileName);
        params.append('repositoryId', repositoryId.toString());
        return this.http.get('/api/files/' + fileName + '/' + repositoryId);
    };
    FileService.prototype.deleteFile = function (fileId) {
        return this.http.delete("api/files/".concat(fileId), { responseType: 'text' });
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
    FileService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
var UploadFileOptions = /** @class */ (function () {
    function UploadFileOptions() {
        this.useHashAsFileName = true;
        this.checkIfFileExists = true;
    }
    return UploadFileOptions;
}());
exports.UploadFileOptions = UploadFileOptions;
//# sourceMappingURL=file.service.js.map