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
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var seminar_report_model_1 = require("../shared/seminar-report.model");
var common_1 = require("@angular/common");
var SeminarReportComponent = (function () {
    function SeminarReportComponent(router, route, seminarReportService, location) {
        this.router = router;
        this.route = route;
        this.seminarReportService = seminarReportService;
        this.location = location;
        this.report = new seminar_report_model_1.SeminarReportModel();
    }
    SeminarReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var rsurReportId = params['id'];
            _this.seminarReportService.getReport(rsurReportId).subscribe(function (res) {
                _this.report = res;
                _this.isLoading = false;
                $.ready.then(function () {
                    _this.imageLinks = $("#photos").find("a");
                });
            });
        });
    };
    SeminarReportComponent.prototype.downloadPhotos = function () {
        this.imageLinks.each(function (i, elem) {
            elem.setAttribute('download', 'image_' + (i + 1));
            elem.click();
            elem.removeAttribute('download');
        });
    };
    return SeminarReportComponent;
}());
SeminarReportComponent = __decorate([
    core_1.Component({
        selector: 'seminar-report',
        templateUrl: "./app/components/rsur/seminar-report/report.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        seminar_report_service_1.SeminarReportService,
        common_1.Location])
], SeminarReportComponent);
exports.SeminarReportComponent = SeminarReportComponent;
//# sourceMappingURL=seminar-report.component.js.map