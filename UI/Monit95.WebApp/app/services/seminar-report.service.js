"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SeminarReportService = /** @class */ (function () {
    function SeminarReportService(http) {
        this.http = http;
        this.endpoint = 'api/rsur/seminarReports';
    }
    // Отправка файл протокола
    SeminarReportService.prototype.sendProtocol = function (reportId, protocolFile) {
        // Generate FormData
        var formData = new FormData();
        formData.append('protocolFile', protocolFile, protocolFile.name);
        // Generate request parameter
        var httpParams = new http_1.HttpParams();
        httpParams = httpParams.append('isProtocol', 'true');
        return this.http.post(this.endpoint + "/" + reportId + "/files", formData, { params: httpParams });
    };
    // Отправка файлов фотографий
    SeminarReportService.prototype.sendFotos = function (reportId, protocolFile) {
        // FormData
        var formData = new FormData();
        formData.append('protocolFile', protocolFile, protocolFile.name);
        // Request parameter
        var params = new http_1.HttpParams();
        params = params.append('isProtocol', 'true');
        return this.http.post(this.endpoint + "/" + reportId + "/files", formData, { params: params });
    };
    SeminarReportService.prototype.postText = function (text) {
        return this.http.post(this.endpoint, { text: text });
    };
    SeminarReportService.prototype.postImages = function (images, reportId) {
        var formData = new FormData();
        images.forEach(function (val, i, arr) { return formData.append("image" + i, val, val.name); });
        return this.http.post(this.endpoint + "/" + reportId + "/files", formData, { responseType: 'text' });
    };
    SeminarReportService.prototype.getReportsList = function () {
        return this.http.get(this.endpoint);
    };
    SeminarReportService.prototype.getReport = function (reportId) {
        return this.http.get(this.endpoint + "/" + reportId);
    };
    SeminarReportService.prototype.deleteReport = function (reportId) {
        return this.http.delete(this.endpoint + "/" + reportId, { responseType: 'text' });
    };
    SeminarReportService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SeminarReportService);
    return SeminarReportService;
}());
exports.SeminarReportService = SeminarReportService;
//# sourceMappingURL=seminar-report.service.js.map