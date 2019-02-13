"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var file_service_1 = require("../../../services/file.service");
var account_service_1 = require("../../../services/account.service");
var functions_1 = require("../../../utils/functions");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var material_1 = require("@angular/material");
var area_collector_service_1 = require("../../../shared/area-collector.service");
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
        this.collecterStateSub$ = this.collectorService.getCollectorState(this.collectorId).subscribe(function (state) {
            if (state.IsFinished) {
                _this.uploadStatus = 'uploaded';
            }
        });
    };
    ExcelUploadComponent.prototype.uploadXlsx = function (evt) {
        var _this = this;
        var file = evt.target.files[0];
        if (validateFile(file)) {
            var fileName = this.getFileName(file);
            this.uploadStatus = 'uploading';
            this.uploadFileSub$ = this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false, false)
                .subscribe(function (fileId) {
                _this.uploadedFileId = Number.parseInt(fileId);
                _this.collectorIsFinishedSub$ = _this.collectorService.isFinished(_this.collectorId, true).subscribe(function () { return _this.uploadStatus = 'uploaded'; });
            }, function (error) {
                if (error.status === 409) {
                    alert(JSON.parse(error.error).Message);
                }
                else {
                    throw error;
                }
                _this.uploadStatus = 'waiting';
            });
        }
        evt.target.value = '';
    };
    //cancelUploaded() {
    //	if (this.uploadedFileId) {
    //		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //			width: '400px',
    //			disableClose: true,
    //			data: { message: 'Вы действительно хотите удалить отправленный протокол проверки заданий?' }
    //		});
    //		dialogRef.afterClosed().subscribe(res => {
    //			if (res) {
    //				this.fileService.deleteFile(this.uploadedFileId).subscribe(() => {
    //					this.collectorService.isFinished(this.collectorId, false).subscribe(() => this.uploadStatus = 'waiting');
    //				});
    //			}
    //		});
    //	}
    //}
    ExcelUploadComponent.prototype.getFileName = function (file) {
        return this.fileNamePrefix + "_" + this.accountService.account.UserName + "." + functions_1.getFileExtension(file.name);
    };
    ExcelUploadComponent.prototype.ngOnDestroy = function () {
        this.collecterStateSub$.unsubscribe();
        if (this.uploadFileSub$)
            this.uploadFileSub$.unsubscribe();
        if (this.collectorIsFinishedSub$)
            this.collectorIsFinishedSub$.unsubscribe();
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