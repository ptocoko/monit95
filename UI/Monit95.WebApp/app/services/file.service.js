"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var FileService = /** @class */ (function () {
    function FileService(http) {
        this.http = http;
        this.endpoint = '/api/repositories';
    }
    FileService.prototype.uploadFile = function (repositoryId, file, fileName, useHashAsFileName) {
        if (useHashAsFileName === void 0) { useHashAsFileName = true; }
        var formData = new FormData();
        formData.append('file', file, fileName ? fileName : file.name);
        return this.http.post(this.endpoint + "/" + repositoryId + "/files", formData, { responseType: 'text', params: { 'useHashAsFileName': "" + useHashAsFileName } });
    };
    FileService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map