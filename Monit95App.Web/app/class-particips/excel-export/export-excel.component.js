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
var http_1 = require("@angular/http");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var angular2_modal_1 = require("angular2-modal");
var export_excel_modal_component_1 = require("./export-excel-modal.component");
var particip_service_1 = require("../../particip.service");
var router_1 = require("@angular/router");
var ClassParticipsExportExcelComponent = (function () {
    function ClassParticipsExportExcelComponent(http, modal, participService, router) {
        this.http = http;
        this.modal = modal;
        this.participService = participService;
        this.router = router;
    }
    ClassParticipsExportExcelComponent.prototype.exportParticips = function (event) {
        var _this = this;
        var file = event.target.files[0];
        if (file.name.split('.').pop() === 'xlsx') {
            this.modal.open(export_excel_modal_component_1.ExportExcelModal, angular2_modal_1.overlayConfigFactory({ file: file, size: 'lg' }, bootstrap_1.BSModalContext)).then(function (modal) {
                modal.result.then(function (result) {
                    _this.router.navigate(['/class-particips/list']);
                });
            }).catch(function (data) {
                //console.log(data);
            });
        }
        else {
            alert('Неверный тип файла. Загрузите файл с расширением ".xlsx"');
        }
    };
    ClassParticipsExportExcelComponent.prototype.downloadExcelTemplate = function () {
        var _this = this;
        this.http.get('/api/ExcelFiles/GetExcelTemplate', { responseType: http_1.ResponseContentType.Blob }).subscribe(function (data) { return _this.downloadFile(data); });
    };
    ClassParticipsExportExcelComponent.prototype.downloadFile = function (data) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(data.blob());
        a.download = 'excel';
        a.click();
    };
    return ClassParticipsExportExcelComponent;
}());
ClassParticipsExportExcelComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/excel-export/export-excel.component.html?v=" + new Date().getTime(),
        styles: [
            ".fileUploader {\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: relative;\n\t\t\t}\n\n\t\t\t.fileUploader [type=file] {\n\t\t\t\tcursor: inherit;\n\t\t\t\tdisplay: block;\n\t\t\t\tfont-size: 999px;\n\t\t\t\tfilter: alpha(opacity=0);\n\t\t\t\tmin-height: 100%;\n\t\t\t\tmin-width: 100%;\n\t\t\t\topacity: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\ttext-align: right;\n\t\t\t\ttop: 0;\n\t\t\t}"
        ]
    }),
    __metadata("design:paramtypes", [http_1.Http,
        bootstrap_1.Modal,
        particip_service_1.ParticipService,
        router_1.Router])
], ClassParticipsExportExcelComponent);
exports.ClassParticipsExportExcelComponent = ClassParticipsExportExcelComponent;
//# sourceMappingURL=export-excel.component.js.map