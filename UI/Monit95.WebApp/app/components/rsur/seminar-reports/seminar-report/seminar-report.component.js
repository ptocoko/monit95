"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var common_1 = require("@angular/common");
var account_service_1 = require("../../../../services/account.service");
var Observable_1 = require("rxjs/Observable");
var SeminarReportComponent = /** @class */ (function () {
    function SeminarReportComponent(router, route, seminarReportService, location, accountService) {
        this.router = router;
        this.route = route;
        this.seminarReportService = seminarReportService;
        this.location = location;
        this.accountService = accountService;
    }
    SeminarReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var rsurReportId = params['id'];
            _this.seminarReportService.getReport(rsurReportId).subscribe(function (res) {
                _this.report = res;
                _this.photoKeys = Object.keys(_this.report.SeminarFiles).filter(function (f) { return f.includes('foto'); });
                _this.isLoading = false;
                Observable_1.Observable.fromEvent(document, 'keydown')
                    .filter(function (e) { return [37, 39, 27].indexOf(e.keyCode) >= 0 && _this.viewingImageKey != null; })
                    .subscribe(_this.keyUpHandler.bind(_this));
            });
        });
    };
    SeminarReportComponent.prototype.showViewer = function (imageKey) {
        this.viewingImageKey = imageKey;
    };
    SeminarReportComponent.prototype.hideViewer = function () {
        this.viewingImageKey = null;
    };
    SeminarReportComponent.prototype.hasPrevImg = function () {
        if (this.viewingImageKey) {
            if (this.viewingImageKey === 'protocol') {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
    SeminarReportComponent.prototype.hasNextImg = function () {
        if (this.viewingImageKey) {
            if (this.photoKeys.indexOf(this.viewingImageKey) === this.photoKeys.length - 1) {
                return false;
            }
            return true;
        }
        return false;
    };
    SeminarReportComponent.prototype.showPrevImg = function () {
        var indexOfViewingPhoto = this.photoKeys.indexOf(this.viewingImageKey);
        if (indexOfViewingPhoto === 0) {
            this.viewingImageKey = 'protocol';
            return;
        }
        else {
            this.viewingImageKey = this.photoKeys[indexOfViewingPhoto - 1];
            return;
        }
    };
    SeminarReportComponent.prototype.showNextImg = function () {
        if (this.viewingImageKey === 'protocol') {
            this.viewingImageKey = this.photoKeys[0];
            return;
        }
        else {
            var indexOfViewingPhoto = this.photoKeys.indexOf(this.viewingImageKey);
            this.viewingImageKey = this.photoKeys[indexOfViewingPhoto + 1];
            return;
        }
    };
    SeminarReportComponent.prototype.keyUpHandler = function (e) {
        if (e.keyCode === 37 && this.hasPrevImg()) {
            this.showPrevImg();
            return;
        }
        if (e.keyCode === 39 && this.hasNextImg()) {
            this.showNextImg();
            return;
        }
        if (e.keyCode === 27) {
            this.hideViewer();
            return;
        }
    };
    SeminarReportComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'seminar-report',
            templateUrl: "./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.css?v=" + new Date().getTime()]
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