"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VprService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var VprService = /** @class */ (function () {
    function VprService(http) {
        this.http = http;
    }
    VprService.prototype.getSchoolWeek = function (classNumber, subjectCode) {
        var params = new http_1.HttpParams();
        params.append('classNumber', classNumber);
        params.append('subjectCode', subjectCode);
        return this.http.get("/api/vpr?classNumber=".concat(classNumber, "&subjectCode=").concat(subjectCode));
    };
    VprService.prototype.saveSchoolWeek = function (schoolWeek) {
        return this.http.post('/api/vpr', schoolWeek, { responseType: 'text' });
    };
    VprService.prototype.getClasses = function () {
        return this.http.get('/api/vpr/classes');
    };
    VprService.prototype.getSubjects = function (classNumber) {
        return this.http.get('/api/vpr/subjects?classNumber=' + classNumber);
    };
    VprService.prototype.getAreas = function (classNumber, subjectCode) {
        return this.http.get('/api/vpr/areas?classNumber=' + classNumber + '&subjectCode=' + subjectCode);
    };
    VprService.prototype.getSchools = function (classNumber, subjectCode, areaCode) {
        return this.http.get('/api/vpr/schools?classNumber=' + classNumber + '&subjectCode=' + subjectCode + '&areaCode=' + areaCode);
    };
    VprService.prototype.getStats = function (classNumber, subjectCode, schoolId) {
        return this.http.get('/api/vpr/statistics?classNumber=' + classNumber + '&subjectCode=' + subjectCode + '&schoolId=' + schoolId);
    };
    VprService.prototype.canSendSecond = function (SecChance) {
        return this.http.put('/api/vpr', SecChance, { responseType: 'text' });
    };
    VprService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], VprService);
    return VprService;
}());
exports.VprService = VprService;
//# sourceMappingURL=vpr.service.js.map