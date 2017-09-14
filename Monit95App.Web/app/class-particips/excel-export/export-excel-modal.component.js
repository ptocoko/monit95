"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var angular2_modal_1 = require("angular2-modal");
var http_1 = require("@angular/http");
var ExportExcelModalData = (function (_super) {
    __extends(ExportExcelModalData, _super);
    function ExportExcelModalData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExportExcelModalData;
}(bootstrap_1.BSModalContext));
exports.ExportExcelModalData = ExportExcelModalData;
var ExportExcelModal = (function () {
    function ExportExcelModal(dialog, http) {
        this.dialog = dialog;
        this.http = http;
        this.exportedFile = dialog.context.file;
    }
    ExportExcelModal.prototype.ngOnInit = function () {
        var _this = this;
        this.isExporting = true;
        var formData = new FormData();
        formData.append('uploadFile', this.exportedFile, this.exportedFile.name);
        this.http.post('/api/ExcelFiles/Upload', formData).subscribe(function (res) {
            _this.exportResults = res.json();
            _this.isExporting = false;
        });
    };
    return ExportExcelModal;
}());
ExportExcelModal = __decorate([
    core_1.Component({
        styles: ["\n\t\t.custom-modal-container {\n\t\t\tpadding: 15px;\n\t\t}\n\t"],
        templateUrl: './app/class-particips/excel-export/export-excel-modal.component.html'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, http_1.Http])
], ExportExcelModal);
exports.ExportExcelModal = ExportExcelModal;
//# sourceMappingURL=export-excel-modal.component.js.map