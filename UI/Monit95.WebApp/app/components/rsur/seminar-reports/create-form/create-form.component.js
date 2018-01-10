"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var material_1 = require("@angular/material");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent(seminarReportService, snackBar) {
        var _this = this;
        this.seminarReportService = seminarReportService;
        this.snackBar = snackBar;
        this.seminarFiles = [];
        this.maxFileSize = 15728640; // 15 MB 
        this.filesCount = 0; // используется для генерации уникальных ключей для файлов
        this.acceptedFileExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'pdf'];
        this.getNotProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === false; }); };
        this.getProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === true; }); };
        this.getFilesWithError = function () { return _this.seminarFiles.filter(function (f) { return f.errorMessage; }); };
    }
    SeminarReportCreateFormComponent.prototype.addFiles = function (event, isProtocol) {
        if (isProtocol === void 0) { isProtocol = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var files, i, seminarFile, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        files = event.target.files;
                        if (!this.validateFiles(files, isProtocol)) return [3 /*break*/, 7];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3 /*break*/, 6];
                        _a = {
                            // 
                            key: isProtocol ? 'protocol' : "image_" + this.filesCount++,
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
                        console.log(this.seminarFiles);
                        _c.label = 7;
                    case 7:
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
            fileReader.onerror = function (error) { return reject(error.message); };
            fileReader.readAsDataURL(file);
        });
    };
    SeminarReportCreateFormComponent.prototype.sendFiles = function () {
        var _this = this;
        var formData = new FormData();
        for (var _i = 0, _a = this.seminarFiles; _i < _a.length; _i++) {
            var seminarImage = _a[_i];
            formData.append(seminarImage.key, seminarImage.file, seminarImage.file.name);
        }
        this.seminarReportService.postFiles(formData).subscribe(function (response) {
            console.log(response);
        }, function (error) {
            if (error.status !== 409) {
                throw Error(error.error.Message);
            }
            else {
                _this.filesConflictHandler(error);
            }
        });
    };
    SeminarReportCreateFormComponent.prototype.filesConflictHandler = function (error) {
        var keys = Object.keys(error.state);
        var _loop_1 = function (key) {
            this_1.seminarFiles.find(function (val, i) { return val.key === key; }).errorMessage = error.state[key];
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
    };
    SeminarReportCreateFormComponent.prototype.remove = function (key) {
        console.log(key);
        this.seminarFiles.splice(this.seminarFiles.indexOf(this.seminarFiles.find(function (val, i) { return val.key === key; })), 1);
    };
    SeminarReportCreateFormComponent.prototype.validateFiles = function (files, isProtocolFiles) {
        for (var i = 0; i < files.length; i++) {
            if (this.acceptedFileExtensions.indexOf(getFileExtension(files[i].name)) < 0) {
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
        tslib_1.__metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService, material_1.MatSnackBar])
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
exports.SeminarReportCreateFormComponent = SeminarReportCreateFormComponent;
function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
//# sourceMappingURL=create-form.component.js.map