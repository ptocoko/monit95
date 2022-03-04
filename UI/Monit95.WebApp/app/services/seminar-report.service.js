"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarReportService = void 0;
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
    SeminarReportService.prototype.postText = function (text) {
        return this.http.post(this.endpoint, { text: text });
    };
    SeminarReportService.prototype.postImages = function (images, reportId) {
        var formData = new FormData();
        images.forEach(function (val, i, arr) { return formData.append("image".concat(i), val, val.name); });
        return this.http.post("".concat(this.endpoint, "/").concat(reportId, "/files"), formData, { responseType: 'text' });
    };
    SeminarReportService.prototype.getReportsList = function () {
        return this.http.get(this.endpoint);
    };
    SeminarReportService.prototype.getReport = function (reportId) {
        return this.http.get("".concat(this.endpoint, "/").concat(reportId));
    };
    SeminarReportService.prototype.deleteReport = function (reportId) {
        return this.http.delete("".concat(this.endpoint, "/").concat(reportId), { responseType: 'text' });
    };
    SeminarReportService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SeminarReportService);
    return SeminarReportService;
}());
exports.SeminarReportService = SeminarReportService;
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
//# sourceMappingURL=seminar-report.service.js.map