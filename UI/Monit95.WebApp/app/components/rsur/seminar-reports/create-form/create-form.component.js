var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
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
        return __awaiter(this, void 0, void 0, function () {
            var files, i, seminarFile, _a, _b;
            return __generator(this, function (_c) {
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
    SeminarReportCreateFormComponent = __decorate([
        Component({
            templateUrl: './create-form.component.html',
            styleUrls: ['./create-form.component.css']
        }),
        __metadata("design:paramtypes", [SeminarReportService,
            MatSnackBar,
            Location])
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
export { SeminarReportCreateFormComponent };
function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
//# sourceMappingURL=create-form.component.js.map