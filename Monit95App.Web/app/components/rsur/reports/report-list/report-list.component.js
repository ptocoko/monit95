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
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var router_1 = require("@angular/router");
var TEST_DATE = '2017-10-11';
var ReportListComponent = (function () {
    function ReportListComponent(rsurReportService, route) {
        this.rsurReportService = rsurReportService;
        this.route = route;
    }
    ReportListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var schoolFromStorage = localStorage.getItem('selectedSchool');
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : 'Все организации';
        var testFromStorage = localStorage.getItem('selectedTest');
        this.selectedTest = testFromStorage ? schoolFromStorage : 'Все блоки';
        this.isLoading = true;
        this.rsurReportService.getReports(TEST_DATE).subscribe(function (res) {
            _this.resultsList = res.json();
            _this.rsurTests = _this.resultsList.map(function (s) { return s.TestNameWithDate; })
                .filter(function (val, i, self) { return self.indexOf(val) === i; }); // distinct            
            _this.isLoading = false;
        });
    };
    ReportListComponent.prototype.openReport = function (rsurParticipCode) {
        localStorage.setItem('selectedSchool', this.selectedSchool);
        localStorage.setItem('selectedTest', this.selectedTest);
        this.route.navigate(['/rsur/report', rsurParticipCode]);
    };
    return ReportListComponent;
}());
ReportListComponent = __decorate([
    core_1.Component({
        selector: 'report-list',
        templateUrl: "./app/components/rsur/reports/report-list/report-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [rsur_report_service_1.RsurReportService,
        router_1.Router])
], ReportListComponent);
exports.ReportListComponent = ReportListComponent;
//# sourceMappingURL=report-list.component.js.map