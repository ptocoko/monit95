"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
SeminarReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], SeminarReportService);
exports.SeminarReportService = SeminarReportService;
//# sourceMappingURL=seminar-report.service.js.map