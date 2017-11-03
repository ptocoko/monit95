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
        var formData = new FormData();
        this.images.forEach(function (val, i, arr) { return formData.append('image' + i, val, val.name); });
        this.uploadReportService.post(formData).subscribe(function (data) { return console.log(data); });
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