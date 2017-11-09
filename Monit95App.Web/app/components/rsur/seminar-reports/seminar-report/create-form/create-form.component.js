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
var seminar_report_service_1 = require("../../../../../services/seminar-report.service");
var CreateReportFormComponent = (function () {
    function CreateReportFormComponent(location, seminarReportService) {
        this.location = location;
        this.seminarReportService = seminarReportService;
        this.images = new Array();
        this.protocolText = "";
    }
    CreateReportFormComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                this.images.push(files[i]);
            }
        }
        event.target.value = '';
    };
    CreateReportFormComponent.prototype.validateSelectedPhotos = function (files) {
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
    CreateReportFormComponent.prototype.deletePhoto = function (image) {
        var index = this.images.indexOf(image);
        this.images.splice(index, 1);
    };
    CreateReportFormComponent.prototype.send = function () {
        var _this = this;
        if (this.validateForm()) {
            this.seminarReportService.postText(this.protocolText).subscribe(function (reportId) {
                _this.seminarReportService.postImages(_this.images, reportId).subscribe(function () { return _this.location.back(); });
            });
        }
    };
    CreateReportFormComponent.prototype.validateForm = function () {
        if (this.images.length < 1) {
            alert('Необходимо добавить хотя бы одну фотографию.');
            return false;
        }
        if (this.protocolText.length < 100) {
            alert('Текст должен состоять из минимум 100 символов.');
            return false;
        }
        return true;
    };
    CreateReportFormComponent.prototype.cancel = function () {
        this.location.back();
    };
    return CreateReportFormComponent;
}());
CreateReportFormComponent = __decorate([
    core_1.Component({
        selector: 'upload-report',
        templateUrl: "./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [common_1.Location, seminar_report_service_1.SeminarReportService])
], CreateReportFormComponent);
exports.CreateReportFormComponent = CreateReportFormComponent;
//# sourceMappingURL=create-form.component.js.map