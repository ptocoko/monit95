"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SeminarReportService = (function () {
    function SeminarReportService(http) {
        this.http = http;
    }
    SeminarReportService.prototype.postText = function (text) {
        return this.http.post('/api/rsur/seminarReports', { text: text });
    };
    SeminarReportService.prototype.postImages = function (images, reportId) {
        var data = new FormData();
        images.forEach(function (val, i, arr) { return data.append('image' + i, val, val.name); });
        return this.http.post("/api/rsur/seminarReports/" + reportId + "/files", data, { responseType: 'text' });
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
    return SeminarReportService;
}());
SeminarReportService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
], SeminarReportService);
exports.SeminarReportService = SeminarReportService;
//# sourceMappingURL=seminar-report.service.js.map