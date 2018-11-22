"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var reports_service_1 = require("../../../services/iTakeEge/reports/reports.service");
var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var participTestId = params['participTestId'];
            _this.reportService.getExtendReport(participTestId).subscribe(function (res) {
                _this.reportData = res;
            });
        });
    };
    ReportComponent.prototype.getGradeColor = function (grade100) {
        if (grade100 < 60) {
            return 'low-grade';
        }
        else if (grade100 > 59 && grade100 < 81) {
            return 'medium-grade';
        }
        else {
            return 'high-grade';
        }
    };
    ReportComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/reports/report/report.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/reports/report/report.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [reports_service_1.ReportsService,
            router_1.ActivatedRoute])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map