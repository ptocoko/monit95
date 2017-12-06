"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var seminar_report_service_1 = require("../../../../../services/seminar-report.service");
var forms_1 = require("@angular/forms");
var basic_validators_1 = require("../../../../../shared/basic-validators");
var CreateReportFormComponent = (function () {
    function CreateReportFormComponent(location, seminarReportService, fb) {
        this.location = location;
        this.seminarReportService = seminarReportService;
        this.fb = fb;
        this.images = new Array();
        this.isSending = false;
    }
    CreateReportFormComponent.prototype.ngOnInit = function () {
        this.reportForm = this.fb.group({
            protocolText: ['', [forms_1.Validators.required, basic_validators_1.BasicValidators.textMinLengthWithoutSpaces(100), forms_1.Validators.maxLength(1000)]]
        });
    };
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
            if (files[i].size / 1024 / 1024 > 15) {
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
        if (this.reportForm.valid && this.images.length > 0) {
            this.isSending = true;
            this.seminarReportService.postText(this.reportForm.get('protocolText').value).subscribe(function (reportId) {
                _this.seminarReportService.postImages(_this.images, reportId).subscribe(function () {
                    _this.isSending = false;
                    _this.location.back();
                });
            });
        }
    };
    CreateReportFormComponent.prototype.cancel = function () {
        this.location.back();
    };
    return CreateReportFormComponent;
}());
CreateReportFormComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'upload-report',
        templateUrl: "./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.css?v=" + new Date().getTime()]
    }),
    tslib_1.__metadata("design:paramtypes", [common_1.Location,
        seminar_report_service_1.SeminarReportService,
        forms_1.FormBuilder])
], CreateReportFormComponent);
exports.CreateReportFormComponent = CreateReportFormComponent;
//# sourceMappingURL=create-form.component.js.map