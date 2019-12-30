var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { AreaCollectorService } from '../../../shared/area-collector.service';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
var REPOSITORY_ID = 6;
var ExcelUploadComponent = /** @class */ (function () {
    function ExcelUploadComponent(fileService, accountService, schoolCollectorService, areaCollectorService, dialog) {
        this.fileService = fileService;
        this.accountService = accountService;
        this.schoolCollectorService = schoolCollectorService;
        this.areaCollectorService = areaCollectorService;
        this.dialog = dialog;
        this.uploadStatus = 'waiting';
    }
    ExcelUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.collectorFor === 'school') {
            this.collectorService = this.schoolCollectorService;
        }
        else if (this.collectorFor === 'area') {
            this.collectorService = this.areaCollectorService;
        }
        else {
            throw new Error('collectorFor is not setted');
        }
        if (this.repositoryId === undefined || this.repositoryId === null || isNaN(this.repositoryId)) {
            throw new Error('repositoryId is not setted');
        }
        var fileName;
        this.fileIdSub$ = this.getFileName().pipe(switchMap(function (filename) {
            fileName = filename;
            return _this.collectorService.getCollectorState(_this.collectorId);
        }), switchMap(function (state) {
            if (state.IsFinished) {
                _this.uploadStatus = 'uploaded';
                return _this.fileService.getFileId(fileName, _this.repositoryId);
            }
            else {
                return of(-1);
            }
        })).subscribe(function (fileId) {
            if (fileId > 0) {
                _this.uploadedFileId = fileId;
            }
        });
    };
    ExcelUploadComponent.prototype.uploadXlsx = function (evt) {
        var _this = this;
        var file = evt.target.files[0];
        if (validateFile(file)) {
            this.uploadFileSub$ = this.getFileName().pipe(switchMap(function (filename) {
                _this.uploadStatus = 'uploading';
                return _this.fileService.uploadFile(_this.repositoryId, file, filename, false, false);
            }), switchMap(function (fileId) {
                _this.uploadedFileId = Number.parseInt(fileId);
                return _this.collectorService.isFinished(_this.collectorId, true);
            })).subscribe(function () { return _this.uploadStatus = 'uploaded'; });
        }
        evt.target.value = '';
    };
    ExcelUploadComponent.prototype.cancelUploaded = function () {
        var _this = this;
        if (this.uploadedFileId) {
            var dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '400px',
                disableClose: true,
                data: { message: 'Вы действительно хотите удалить отправленный протокол проверки заданий?' }
            });
            dialogRef.afterClosed().subscribe(function (res) {
                if (res) {
                    _this.deleteFileSub$ = _this.fileService.deleteFile(_this.uploadedFileId)
                        .pipe(switchMap(function () { return _this.collectorService.isFinished(_this.collectorId, false); }))
                        .subscribe(function () {
                        _this.uploadStatus = 'waiting';
                        _this.uploadedFileId = null;
                    });
                }
            });
        }
    };
    ExcelUploadComponent.prototype.getFileName = function () {
        var _this = this;
        return this.accountService.auth
            .pipe(map(function (auth) { return _this.fileNamePrefix + "_" + auth.UserName + "." + _this.downloadExt; }));
    };
    ExcelUploadComponent.prototype.ngOnDestroy = function () {
        if (this.fileIdSub$)
            this.fileIdSub$.unsubscribe();
        if (this.uploadFileSub$)
            this.uploadFileSub$.unsubscribe();
        if (this.deleteFileSub$)
            this.deleteFileSub$.unsubscribe();
    };
    __decorate([
        Input('testCode'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "testCode", void 0);
    __decorate([
        Input('collectorId'),
        __metadata("design:type", Number)
    ], ExcelUploadComponent.prototype, "collectorId", void 0);
    __decorate([
        Input('fileNamePrefix'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "fileNamePrefix", void 0);
    __decorate([
        Input('collectorFor'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "collectorFor", void 0);
    __decorate([
        Input('caption'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "caption", void 0);
    __decorate([
        Input('downloadHref'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "downloadHref", void 0);
    __decorate([
        Input('downloadExt'),
        __metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "downloadExt", void 0);
    __decorate([
        Input('repositoryId'),
        __metadata("design:type", Number)
    ], ExcelUploadComponent.prototype, "repositoryId", void 0);
    ExcelUploadComponent = __decorate([
        Component({
            selector: 'app-excel-upload',
            templateUrl: './uploader.component.html',
            styleUrls: ['./uploader.component.css']
        }),
        __metadata("design:paramtypes", [FileService,
            AccountService,
            SchoolCollectorService,
            AreaCollectorService,
            MatDialog])
    ], ExcelUploadComponent);
    return ExcelUploadComponent;
}());
export { ExcelUploadComponent };
function validateFile(file) {
    if (getFileExtension(file.name) !== 'xlsx') {
        alert('Неподдерживаемы тип файла! ' + file.name);
        return false;
    }
    return true;
}
//# sourceMappingURL=uploader.component.js.map