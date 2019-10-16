"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var file_service_1 = require("../../../services/file.service");
var account_service_1 = require("../../../services/account.service");
var functions_1 = require("../../../utils/functions");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var area_collector_service_1 = require("../../../shared/area-collector.service");
var operators_1 = require("rxjs/operators");
var of_1 = require("rxjs/observable/of");
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
        this.fileIdSub$ = this.getFileName().pipe(operators_1.switchMap(function (filename) {
            fileName = filename;
            return _this.schoolCollectorService.getCollectorState(_this.collectorId);
        }), operators_1.switchMap(function (state) {
            if (state.IsFinished) {
                _this.uploadStatus = 'uploaded';
                return _this.fileService.getFileId(fileName, _this.repositoryId);
            }
            else {
                return of_1.of(-1);
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
            this.uploadFileSub$ = this.getFileName().pipe(operators_1.switchMap(function (filename) {
                _this.uploadStatus = 'uploading';
                return _this.fileService.uploadFile(_this.repositoryId, file, filename, false, false);
            }), operators_1.switchMap(function (fileId) {
                _this.uploadedFileId = Number.parseInt(fileId);
                return _this.collectorService.isFinished(_this.collectorId, true);
            })).subscribe(function () { return _this.uploadStatus = 'uploaded'; });
        }
        evt.target.value = '';
    };
    ExcelUploadComponent.prototype.cancelUploaded = function () {
        var _this = this;
        if (this.uploadedFileId) {
            var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
                width: '400px',
                disableClose: true,
                data: { message: 'Вы действительно хотите удалить отправленный протокол проверки заданий?' }
            });
            dialogRef.afterClosed().subscribe(function (res) {
                if (res) {
                    _this.deleteFileSub$ = _this.fileService.deleteFile(_this.uploadedFileId)
                        .pipe(operators_1.switchMap(function () { return _this.collectorService.isFinished(_this.collectorId, false); }))
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
            .pipe(operators_1.map(function (auth) { return _this.fileNamePrefix + "_" + auth.UserName + "." + _this.downloadExt; }));
    };
    ExcelUploadComponent.prototype.ngOnDestroy = function () {
        if (this.fileIdSub$)
            this.fileIdSub$.unsubscribe();
        if (this.uploadFileSub$)
            this.uploadFileSub$.unsubscribe();
        if (this.deleteFileSub$)
            this.deleteFileSub$.unsubscribe();
    };
    tslib_1.__decorate([
        core_1.Input('testCode'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "testCode", void 0);
    tslib_1.__decorate([
        core_1.Input('collectorId'),
        tslib_1.__metadata("design:type", Number)
    ], ExcelUploadComponent.prototype, "collectorId", void 0);
    tslib_1.__decorate([
        core_1.Input('fileNamePrefix'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "fileNamePrefix", void 0);
    tslib_1.__decorate([
        core_1.Input('collectorFor'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "collectorFor", void 0);
    tslib_1.__decorate([
        core_1.Input('caption'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "caption", void 0);
    tslib_1.__decorate([
        core_1.Input('downloadHref'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "downloadHref", void 0);
    tslib_1.__decorate([
        core_1.Input('downloadExt'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "downloadExt", void 0);
    tslib_1.__decorate([
        core_1.Input('repositoryId'),
        tslib_1.__metadata("design:type", Number)
    ], ExcelUploadComponent.prototype, "repositoryId", void 0);
    ExcelUploadComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-excel-upload',
            templateUrl: "./app/components/two-three/excel-uploader/uploader.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/two-three/excel-uploader/uploader.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [file_service_1.FileService,
            account_service_1.AccountService,
            school_collector_service_1.SchoolCollectorService,
            area_collector_service_1.AreaCollectorService,
            material_1.MatDialog])
    ], ExcelUploadComponent);
    return ExcelUploadComponent;
}());
exports.ExcelUploadComponent = ExcelUploadComponent;
function validateFile(file) {
    if (functions_1.getFileExtension(file.name) !== 'xlsx') {
        alert('Неподдерживаемы тип файла! ' + file.name);
        return false;
    }
    return true;
}
//# sourceMappingURL=uploader.component.js.map