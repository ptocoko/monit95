"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var material_1 = require("@angular/material");
var common_1 = require("@angular/common");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent(seminarReportService, snackBar, location) {
        var _this = this;
        this.seminarReportService = seminarReportService;
        this.snackBar = snackBar;
        this.location = location;
        this.seminarFiles = [];
        this.maxFileSize = 15728640; // 15 MB 
        this.fileIndex = 1; // используется для генерации уникальных ключей для файлов семинара
        this.isSending = false;
        this.acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
        this.acceptedProtocolExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif', 'pdf', 'docx'];
        this.getNotProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === false; }); };
        this.getProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === true; }); };
        this.getFilesWithError = function () { return _this.seminarFiles.filter(function (f) { return f.errorMessage; }); };
        this.getFileFromKey = function (key) { return _this.seminarFiles.find(function (val, i) { return val.key === key; }); };
    }
    SeminarReportCreateFormComponent.prototype.addFiles = function (event, isProtocol) {
        if (isProtocol === void 0) { isProtocol = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var files, i, seminarFile, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        files = event.target.files;
                        if (!this.validateFiles(files, isProtocol)) return [3 /*break*/, 6];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3 /*break*/, 6];
                        _a = {
                            // 
                            key: isProtocol ? 'protocol' : "image_" + this.fileIndex++,
                            isProtocol: isProtocol,
                            file: files[i]
                        };
                        if (!isProtocol) return [3 /*break*/, 2];
                        _b = undefined;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getBase64String(files[i])];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        seminarFile = (_a.base64String = _b,
                            _a);
                        this.seminarFiles.push(seminarFile);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        event.target.value = '';
                        return [2 /*return*/];
                }
            });
        });
    };
    SeminarReportCreateFormComponent.prototype.getBase64String = function (file) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.onload = function () { return resolve(fileReader.result); };
            fileReader.onerror = function (error) { return reject(error); };
            fileReader.readAsDataURL(file);
        });
    };
    SeminarReportCreateFormComponent.prototype.sendFiles = function () {
        var _this = this;
        this.isSending = true;
        var formData = new FormData();
        for (var _i = 0, _a = this.seminarFiles; _i < _a.length; _i++) {
            var seminarImage = _a[_i];
            formData.append(seminarImage.key, seminarImage.file, seminarImage.file.name);
        }
        this.seminarReportService.postFiles(formData).subscribe(function (response) {
            _this.location.back();
        }, function (error) {
            _this.isSending = false;
            if (error.status !== 409) {
                throw Error(error.message);
            }
            else {
                _this.filesConflictHandler(error.error);
            }
        });
    };
    SeminarReportCreateFormComponent.prototype.filesConflictHandler = function (error) {
        var keys = Object.keys(error.ModelState);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var currentFile = this.getFileFromKey(key);
            if (currentFile) {
                currentFile.errorMessage = error.ModelState[key][0];
            }
        }
    };
    SeminarReportCreateFormComponent.prototype.cancel = function () {
        this.location.back();
    };
    SeminarReportCreateFormComponent.prototype.remove = function (key) {
        var fileIndex = this.seminarFiles.indexOf(this.getFileFromKey(key));
        this.seminarFiles.splice(fileIndex, 1);
    };
    SeminarReportCreateFormComponent.prototype.validateFiles = function (files, isProtocolFiles) {
        var extensionsToCheck = isProtocolFiles ? this.acceptedProtocolExtensions : this.acceptedImageExtensions;
        for (var i = 0; i < files.length; i++) {
            if (extensionsToCheck.indexOf(getFileExtension(files[i].name)) < 0) {
                this.showMessage('неподдерживаемый тип файла: ' + files[i].name);
                return false;
            }
            if (files[i].size > this.maxFileSize) {
                this.showMessage("\u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 " + files[i].name + " \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 15 \u041C\u0411");
                return false;
            }
        }
        if (!isProtocolFiles) {
            if (files.length > 4 || this.getNotProtocolFiles().length + files.length > 4) {
                this.showMessage('максимально разрешенное количество фотографий — 4');
                return false;
            }
        }
        else {
            if (files.length > 1 || this.getProtocolFiles().length > 0) {
                this.showMessage('нельзя добавить больше одного файла протокола');
                return false;
            }
        }
        return true;
    };
    SeminarReportCreateFormComponent.prototype.showMessage = function (message, actionText) {
        if (actionText === void 0) { actionText = 'OK'; }
        this.snackBar.open(message, actionText, { duration: 3000 });
    };
    SeminarReportCreateFormComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService,
            material_1.MatSnackBar,
            common_1.Location])
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
exports.SeminarReportCreateFormComponent = SeminarReportCreateFormComponent;
function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
//# sourceMappingURL=create-form.component.js.map