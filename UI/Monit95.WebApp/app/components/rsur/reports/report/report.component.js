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
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var code = params['id'];
            _this.reportService.getReport(code).subscribe(function (res) {
                //this.reportData = res.json() as RsurReportModel;                
            });
        });
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