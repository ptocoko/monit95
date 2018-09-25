"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var file_service_1 = require("../../../services/file.service");
var account_service_1 = require("../../../services/account.service");
var functions_1 = require("../../../utils/functions");
var REPOSITORY_ID = 4;
var ExcelUploadComponent = /** @class */ (function () {
    function ExcelUploadComponent(fileService, accountService) {
        this.fileService = fileService;
        this.accountService = accountService;
        this.uploadStatus = 'waiting';
    }
    ExcelUploadComponent.prototype.ngOnInit = function () {
    };
    ExcelUploadComponent.prototype.uploadXlsx = function (evt) {
        var _this = this;
        var file = evt.target.files[0];
        if (validateFile(file)) {
            var fileName = this.getFileName(file);
            this.uploadStatus = 'uploading';
            this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false)
                .subscribe(function () { return _this.uploadStatus = 'uploaded'; }, function (error) {
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
    ExcelUploadComponent.prototype.getFileName = function (file) {
        return this.testCode + "_" + this.accountService.account.UserName + "." + functions_1.getFileExtension(file.name);
    };
    tslib_1.__decorate([
        core_1.Input('testCode'),
        tslib_1.__metadata("design:type", String)
    ], ExcelUploadComponent.prototype, "testCode", void 0);
    ExcelUploadComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-excel-upload',
            templateUrl: "./app/components/two-three/excel-uploader/uploader.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/two-three/excel-uploader/uploader.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [file_service_1.FileService,
            account_service_1.AccountService])
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