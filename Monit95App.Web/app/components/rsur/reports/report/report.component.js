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
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var ReportComponent = (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var code = params['id'];
            _this.reportService.getReport(code).subscribe(function (res) {
                _this.reportData = res.json();
            });
        });
    };
    return ReportComponent;
}());
ReportComponent = __decorate([
    core_1.Component({
        selector: 'report',
        templateUrl: "./app/components/rsur/reports/report/report.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/reports/report/report.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_report_service_1.RsurReportService, typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object])
], ReportComponent);
exports.ReportComponent = ReportComponent;
var _a;
//# sourceMappingURL=report.component.js.map