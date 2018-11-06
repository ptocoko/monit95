"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
        this.isWarnAboutGeoKimFail = false;
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
    ReportComponent.prototype.getGradeColor = function (grade100) {
        if (["0104", "0801"].indexOf(this.reportData.TestNumberCode) > -1 && this.reportData.RsurTestId > 2141) {
            return grade100 < 50 ? 'low-grade' : grade100 < 80 ? 'medium-grade' : 'high-grade';
        }
        else if (this.reportData.RsurTestId === 2152 || this.reportData.RsurTestId === 2155) {
            return grade100 > 70 ? 'high-grade' : 'low-grade';
        }
        else {
            if (grade100 < 60) {
                return 'low-grade';
            }
            else if (grade100 > 59 && grade100 < 81) {
                return 'medium-grade';
            }
            else {
                return 'high-grade';
            }
        }
    };
    ReportComponent.prototype.needToWarn = function () {
        if (this.reportData.RsurTestId === 2153 && this.reportData.EgeQuestionResults.find(function (val) { return val.EgeQuestionNumber === 26; }).Value < 100) {
            this.isWarnAboutGeoKimFail = true;
        }
    };
    ReportComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'report',
            templateUrl: "./app/components/rsur/reports/report/report.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/reports/report/report.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_report_service_1.RsurReportService,
            router_1.ActivatedRoute])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map