var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    SeminarReportService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], SeminarReportService);
    return SeminarReportService;
}());
export { SeminarReportService };
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