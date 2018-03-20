"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var Observable_1 = require("rxjs/Observable");
var SeminarReportComponent = /** @class */ (function () {
    function SeminarReportComponent(route, seminarReportService) {
        this.route = route;
        this.seminarReportService = seminarReportService;
    }
    SeminarReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var rsurReportId = params['id'];
            _this.seminarReportService.getReport(rsurReportId).subscribe(function (res) {
                _this.report = res;
                //this.photoKeys = this.report.SeminarFiles.map(sf => sf.Key).filter(f => f.includes('image'));
                _this.isLoading = false;
                // пролистывание фотографий в режиме просмотра
                Observable_1.Observable.fromEvent(document, 'keydown')
                    .filter(function (e) { return [37, 39, 27].indexOf(e.keyCode) >= 0 && _this.viewingImage != null; })
                    .subscribe(_this.keyUpHandler.bind(_this));
            });
        });
    };
    SeminarReportComponent.prototype.getPreviewer = function (seminarFile) {
        if (seminarFile.Type === 'image') {
            return 'data:image/png;base64,' + seminarFile.FileSourceString;
        }
        else {
            return '/images/pdf-previewer.png';
        }
    };
    SeminarReportComponent.prototype.showViewer = function (seminarFile) {
        if (seminarFile.Type === 'image')
            this.viewingImage = seminarFile;
    };
    SeminarReportComponent.prototype.hideViewer = function () {
        this.viewingImage = null;
    };
    SeminarReportComponent.prototype.hasPrevImg = function () {
        if (this.viewingImage) {
            if (this.report.SeminarFiles.filter(function (f) { return f.Type === 'image'; }).indexOf(this.viewingImage) === 0) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    };
    SeminarReportComponent.prototype.hasNextImg = function () {
        if (this.viewingImage) {
            if (this.report.SeminarFiles.indexOf(this.viewingImage) === this.report.SeminarFiles.length - 1) {
                return false;
            }
            return true;
        }
        return false;
    };
    SeminarReportComponent.prototype.showPrevImg = function () {
        var indexOfViewingPhoto = this.report.SeminarFiles.indexOf(this.viewingImage);
        this.viewingImage = this.report.SeminarFiles[indexOfViewingPhoto - 1];
        return;
    };
    SeminarReportComponent.prototype.showNextImg = function () {
        var indexOfViewingPhoto = this.report.SeminarFiles.indexOf(this.viewingImage);
        this.viewingImage = this.report.SeminarFiles[indexOfViewingPhoto + 1];
        return;
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
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            seminar_report_service_1.SeminarReportService])
    ], SeminarReportComponent);
    return SeminarReportComponent;
}());
exports.SeminarReportComponent = SeminarReportComponent;
//# sourceMappingURL=seminar-report.component.js.map