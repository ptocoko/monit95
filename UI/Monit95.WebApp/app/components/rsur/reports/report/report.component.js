"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
        this.isWarnAboutGeoKimFail = false;
        this.isWarnAboutGeoKimFail_2 = false;
        this.isSocietyKimFail = false;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var code = params['id'];
            _this.reportService.getReport(code).subscribe(function (res) {
                _this.reportData = res;
                _this.needToWarn();
            });
        });
    };
    ReportComponent.prototype.getGradeColor = function (grade100, rsurQuestionsCount) {
        //if (["0104", "0801"].indexOf(this.reportData.TestNumberCode) > -1 && this.reportData.RsurTestId > 2141 && this.reportData.RsurTestId < 3180) {
        //	return grade100 < 50 ? 'low-grade' : grade100 < 80 ? 'medium-grade' : 'high-grade';
        //} else if (this.reportData.RsurTestId === 2152 || this.reportData.RsurTestId === 2155) {
        //	return grade100 > 70 ? 'high-grade' : 'low-grade';
        //} else {
        //	if (grade100 < 60) {
        //		return 'low-grade';
        //	} else if (grade100 > 59 && grade100 < 81) {
        //		return 'medium-grade';
        //	} else {
        //		return 'high-grade';
        //	}
        //}
        if (this.reportData.TestNumberCode.substr(0, 2) === "03") {
            if (grade100 > 79) {
                return 'high-grade';
            }
            if (this.reportData.Grade5 === 5) {
                return 'medium-grade';
            }
            else {
                return 'low-grade';
            }
        }
        var midPercent = rsurQuestionsCount <= 2 ? 50 : 60;
        var highPercent = this.reportData.RsurTestId === 3185 ? 80 : 81;
        if (grade100 < midPercent) {
            return 'low-grade';
        }
        else if (grade100 >= midPercent && grade100 < highPercent) {
            return 'medium-grade';
        }
        else {
            return 'high-grade';
        }
    };
    ReportComponent.prototype.needToWarn = function () {
        if (this.reportData.RsurTestId === 2153 && this.reportData.EgeQuestionResults.filter(function (f) { return [26, 27].indexOf(f.EgeQuestionNumber) > -1 && f.Value < 100; }).length > 0) {
            this.isWarnAboutGeoKimFail = true;
        }
        if (this.reportData.RsurTestId === 3184 && this.reportData.EgeQuestionResults.filter(function (f) { return f.EgeQuestionNumber === 17 && f.Value < 100; }).length > 0) {
            this.isWarnAboutGeoKimFail_2 = true;
        }
    };
    ReportComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'report',
            templateUrl: "./app/components/rsur/reports/report/report.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/reports/report/report.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_report_service_1.RsurReportService,
            router_1.ActivatedRoute])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map