"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var filter_1 = require("rxjs/operators/filter");
var functions_1 = require("../../../../utils/functions");
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
                fromEvent_1.fromEvent(document, 'keydown').pipe(filter_1.filter(function (e) { return [37, 39, 27].indexOf(e.keyCode) >= 0 && _this.viewingImage != null; }))
                    .subscribe(_this.keyUpHandler.bind(_this));
            });
        });
    };
    SeminarReportComponent.prototype.getPreviewer = function (seminarFile) {
        if (seminarFile.Type === 'image') {
            return seminarFile.FileUrl; //'data:image/png;base64,' + seminarFile.FileSourceString;
        }
        else if (seminarFile.Type === 'pdf') {
            return '/images/pdf-previewer.png';
        }
        else {
            return '/images/docx-previewer.png';
        }
    };
    SeminarReportComponent.prototype.showViewer = function (seminarFile) {
        if (seminarFile.Type === 'image')
            this.viewingImage = seminarFile;
        else {
            //this.openPdf(seminarFile);
            functions_1.downloadFile(seminarFile.FileUrl, "\u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B." + seminarFile.Type);
        }
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
    SeminarReportComponent.prototype.openPdf = function (seminarFile) {
        var objbuilder = '';
        objbuilder += ('<object width="100%" height="100%" data= "data:application/pdf;base64,');
        objbuilder += (seminarFile.FileSourceString);
        objbuilder += ('" type="application/pdf" class="internal">');
        objbuilder += ('<embed src="data:application/pdf;base64,');
        objbuilder += (seminarFile.FileSourceString);
        objbuilder += ('" type="application/pdf"  />');
        objbuilder += ('</object>');
        var win = window.open("#", "_blank");
        var title = seminarFile.Key;
        win.document.write('<html><title>' + title + '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">');
        win.document.write(objbuilder);
        win.document.write('</body></html>');
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