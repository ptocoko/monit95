var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { downloadFile } from '../../../../utils/functions';
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
                fromEvent(document, 'keydown').pipe(filter(function (e) { return [37, 39, 27].indexOf(e.keyCode) >= 0 && _this.viewingImage != null; }))
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
            downloadFile(seminarFile.FileUrl, "\u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B." + seminarFile.Type);
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
    SeminarReportComponent = __decorate([
        Component({
            selector: 'seminar-report',
            templateUrl: './seminar-report.component.html',
            styleUrls: ['./seminar-report.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            SeminarReportService])
    ], SeminarReportComponent);
    return SeminarReportComponent;
}());
export { SeminarReportComponent };
//# sourceMappingURL=seminar-report.component.js.map