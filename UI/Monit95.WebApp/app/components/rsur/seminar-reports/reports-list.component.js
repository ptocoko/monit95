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
var seminar_report_service_1 = require("../../../services/seminar-report.service");
var SeminarReportsListComponent = (function () {
    function SeminarReportsListComponent(seminarReportService) {
        this.seminarReportService = seminarReportService;
        this.reports = new Array();
    }
    SeminarReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.seminarReportService.getReportsList().subscribe(function (res) { return _this.reports = res; });
    };
    return SeminarReportsListComponent;
}());
SeminarReportsListComponent = __decorate([
    core_1.Component({
        selector: 'reports-list',
        templateUrl: "./app/components/rsur/seminar-report/reports-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService])
], SeminarReportsListComponent);
exports.SeminarReportsListComponent = SeminarReportsListComponent;
//# sourceMappingURL=reports-list.component.js.map