"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var results_service_1 = require("../../shared/results.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var ClassParticipResult = /** @class */ (function () {
    function ClassParticipResult() {
    }
    return ClassParticipResult;
}());
exports.ClassParticipResult = ClassParticipResult;
var MAX_MARKS = [4, 1, 3, 1, 1];
var ClassParticipReportComponent = /** @class */ (function () {
    function ClassParticipReportComponent(resultService, route, http) {
        this.resultService = resultService;
        this.route = route;
        this.http = http;
        this.maxMarks = MAX_MARKS;
        this.testDate = "26 сентября 2017 года";
    }
    ClassParticipReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.participTestId = params['participTestId'];
            //this.resultService.getClassParticipResultDto(this.participTestId).subscribe(res => this.particip = res as ClassParticipResult);
        });
    };
    ClassParticipReportComponent.prototype.getPrimaryMarkBgrd = function (primaryMark) {
        if (primaryMark <= 3)
            return { 'red-background': true };
        else if (primaryMark > 3 && primaryMark <= 6)
            return { 'yellow-bgrd': true };
        else if (primaryMark > 6 && primaryMark <= 8)
            return { 'lightgreen-bgrd': true };
        else if (primaryMark > 8)
            return { 'green-bgrd': true };
        else
            throw new Error('Ошибка');
    };
    ClassParticipReportComponent.prototype.download = function () {
        var _this = this;
        this.http.get('/api/ResultReport/Get?participTestId=' + this.participTestId, { responseType: http_1.ResponseContentType.Blob }).subscribe(function (data) {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(data.blob());
            a.download = _this.particip.ClassName.replace(' ', '') + "-" + _this.particip.Surname + "-" + _this.particip.Name;
            a.click();
        });
    };
    ClassParticipReportComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: './particip-report.component.html',
            styleUrls: ['./particip-report.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [results_service_1.ResultsService, router_1.ActivatedRoute, http_1.Http])
    ], ClassParticipReportComponent);
    return ClassParticipReportComponent;
}());
exports.ClassParticipReportComponent = ClassParticipReportComponent;
//# sourceMappingURL=particip-report.component.js.map