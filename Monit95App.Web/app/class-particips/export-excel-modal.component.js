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
            console.log(_this.exportResults);
            _this.isExporting = false;
        });
    };
    return ExportExcelModal;
}());
ExportExcelModal = __decorate([
    core_1.Component({
        styles: ["\n\t\t.custom-modal-container {\n\t\t\tpadding: 15px;\n\t\t}\n\t"],
        template: "\n\t\t<div class=\"container-fluid custom-modal-container\">\n\t\t\t<div *ngIf=\"isExporting\" style=\"text-align:center;margin-top:30px;\" class=\"row\">\n\t\t\t\t<img style=\"display:inline-block;width:40px\" src=\"./app/class-particips/Eclipse.gif\"/>\n\t\t\t\t<h1 style=\"display:inline;margin-left:10px;vertical-align:middle;\">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432...</h1>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!isExporting\">\n\t\t\t\t<h2 style=\"text-align:center\"><b>{{exportResults.CountOfAddedParticips}}</b> \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E!</h2>\n\t\t\t\t<br />\n\t\t\t\t<div class=\"col-xs-12\" *ngIf=\"exportResults.HasRowsWithError\">\n\t\t\t\t\t<div class=\"jumbotron\">\n\t\t\t\t\t\t<h2>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435!</h2>\n\t\t\t\t\t\t<p>\u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 \u0441\u0442\u0440\u043E\u043A <b>{{exportResults.RowNumbersWithError?.join(', ')}}</b> \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 \u0438 \u043D\u0435 \u0431\u044B\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B \u0432 \u0431\u0430\u0437\u0443!</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<hr />\n\t\t\t\t<div style=\"text-align:right\">\n\t\t\t\t\t<button style=\"margin-right:20px\" class=\"btn btn-primary\" (click)=\"dialog.close()\">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\t\t</div>\n"
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, http_1.Http])
], ExportExcelModal);
exports.ExportExcelModal = ExportExcelModal;
//# sourceMappingURL=export-excel-modal.component.js.map