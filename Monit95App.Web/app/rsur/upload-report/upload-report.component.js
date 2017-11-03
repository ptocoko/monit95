"use strict";
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var upload_report_service_1 = require("./upload-report.service");
var UploadReportComponent = (function () {
    function UploadReportComponent(location, uploadReportService) {
        this.location = location;
        this.uploadReportService = uploadReportService;
        this.images = new Array();
        this.protocolText = "";
    }
    UploadReportComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                this.images.push(files[i]);
            }
        }
    };
    UploadReportComponent.prototype.validateSelectedPhotos = function (files) {
        if (this.images.length + files.length > 4) {
            alert('Нельзя отправить больше четырех файлов!');
            return false;
        }
        for (var i = 0; i < files.length; i++) {
            if (files[i].size / 1024 / 1024 > 10) {
                alert('Размер файла ' + files[i].name + ' превышает максимально разрешенный. \nМаксимально разрешенный размер файла — 10 МБ');
                return false;
            }
            if (['png', 'jpg', 'jpeg'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1) {
                alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg');
                return false;
            }
        }
        return true;
    };
    UploadReportComponent.prototype.deletePhoto = function (image) {
        var index = this.images.indexOf(image);
        this.images.splice(index, 1);
    };
    UploadReportComponent.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.uploadReportService.postText(this.protocolText).subscribe(function (reportId) {
                    _this.uploadReportService.postImages(_this.images, reportId).subscribe(function () { return _this.location.back(); });
                });
                return [2 /*return*/];
            });
        });
    };
    UploadReportComponent.prototype.cancel = function () {
        this.location.back();
    };
    return UploadReportComponent;
}());
UploadReportComponent = __decorate([
    core_1.Component({
        selector: 'upload-report',
        templateUrl: "./app/rsur/upload-report/upload-report.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/rsur/upload-report/upload-report.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [common_1.Location, upload_report_service_1.UploadReportService])
], UploadReportComponent);
exports.UploadReportComponent = UploadReportComponent;
//# sourceMappingURL=upload-report.component.js.map