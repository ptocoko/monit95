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
    SeminarReportService.prototype.postFiles = function (formData) {
        return this.http.post(this.endpoint, formData);
    };
    //// Отправка файл протокола
    //sendProtocol(reportId: number, protocolFile: File) {
    //    // Generate FormData
    //    const formData = new FormData();
    //    formData.append('protocolFile', protocolFile, protocolFile.name);
    //    // Generate request parameter
    //    let httpParams = new HttpParams();        
    //    httpParams = httpParams.append('isProtocol', 'true');
    //    return this.http.post(`${this.endpoint}/${reportId}/files`, formData, { params: httpParams });
    //}
    //// Отправка файлов фотографий
    //sendFotos(reportId: number, protocolFile: File) {
    //    // FormData
    //    const formData = new FormData();
    //    formData.append('protocolFile', protocolFile, protocolFile.name);
    //    // Request parameter
    //    let params = new HttpParams();
    //    params = params.append('isProtocol', 'true');
    //    return this.http.post(`${this.endpoint}/${reportId}/files`, formData, { params: params });
    //}
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
        return this.http.get(this.endpoint + "/" + reportId)
            .map(function (m) {
            var keys = Object.keys(m.SeminarFiles);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                m.SeminarFiles[key] = "data:image/png;base64," + m.SeminarFiles[key];
            }
            return m;
        });
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