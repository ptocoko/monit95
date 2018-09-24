"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var file_service_1 = require("../../../services/file.service");
var account_service_1 = require("../../../services/account.service");
var functions_1 = require("../../../utils/functions");
var REPOSITORY_ID = 4;
var TEST_CODE = '0201';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fileService, accountService) {
        this.fileService = fileService;
        this.accountService = accountService;
        this.uploadStatus = 'waiting';
    }
    HomeComponent.prototype.uploadXlsx = function (evt) {
        var _this = this;
        var file = evt.target.files[0];
        if (validateFile(file)) {
            var fileName = this.getFileName(file);
            this.uploadStatus = 'uploading';
            this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false).subscribe(function () { return _this.uploadStatus = 'uploaded'; });
        }
        evt.target.value = '';
    };
    HomeComponent.prototype.getFileName = function (file) {
        return TEST_CODE + "_" + this.accountService.account.UserName + "." + functions_1.getFileExtension(file.name);
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/two-three/home/home.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/two-three/home/home.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [file_service_1.FileService,
            account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
function validateFile(file) {
    if (functions_1.getFileExtension(file.name) !== 'xlsx') {
        alert('Неподдерживаемы тип файла! ' + file.name);
        return false;
    }
    return true;
}
//# sourceMappingURL=home.component.js.map