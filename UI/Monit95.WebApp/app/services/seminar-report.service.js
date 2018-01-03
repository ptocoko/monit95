"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SeminarReportService = /** @class */ (function () {
    function SeminarReportService(http) {
        this.http = http;
    }
    // Регистрация нового отчета - получение Id
    SeminarReportService.prototype.reportRegister = function () {
        return this.http.get('api/rsur/seminarReports');
    };
    // Отправка протокола
    //sendProtocol(reportId: number, protocolFile: File) {
    //    return this.http.post(`api/rsur/seminarReports/${reportId}`)
    //}
    SeminarReportService.prototype.postText = function (text) {
        return this.http.post('/api/rsur/seminarReports', { text: text });
    };
    SeminarReportService.prototype.postImages = function (images, reportId) {
        var formData = new FormData();
        images.forEach(function (val, i, arr) { return formData.append("image" + i, val, val.name); });
        return this.http.post("/api/rsur/seminarReports/" + reportId + "/files", formData, { responseType: 'text' });
    };
    SeminarReportService.prototype.getReportsList = function () {
        return this.http.get('/api/rsur/seminarReports');
    };
    SeminarReportService.prototype.getReport = function (reportId) {
        return this.http.get('/api/rsur/seminarReports/' + reportId);
    };
    SeminarReportService.prototype.deleteReport = function (reportId) {
        return this.http.delete('/api/rsur/seminarReports/' + reportId, { responseType: 'text' });
    };
    SeminarReportService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SeminarReportService);
    return SeminarReportService;
}());
exports.SeminarReportService = SeminarReportService;
//# sourceMappingURL=seminar-report.service.js.map