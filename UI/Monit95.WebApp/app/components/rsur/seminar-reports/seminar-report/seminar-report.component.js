"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var seminar_report_model_1 = require("../shared/seminar-report.model");
var common_1 = require("@angular/common");
var account_service_1 = require("../../../../services/account.service");
var SeminarReportComponent = /** @class */ (function () {
    function SeminarReportComponent(router, route, seminarReportService, location, accountService) {
        this.router = router;
        this.route = route;
        this.seminarReportService = seminarReportService;
        this.location = location;
        this.accountService = accountService;
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
    SeminarReportComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'seminar-report',
            templateUrl: "./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            seminar_report_service_1.SeminarReportService,
            common_1.Location,
            account_service_1.AccountService])
    ], SeminarReportComponent);
    return SeminarReportComponent;
}());
exports.SeminarReportComponent = SeminarReportComponent;
//# sourceMappingURL=seminar-report.component.js.map