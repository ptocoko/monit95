var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
var SchoolReportComponent = /** @class */ (function () {
    function SchoolReportComponent() {
        this.navigate = new EventEmitter();
        this.colorScheme = ['#1dab1d', 'red', 'orange'];
        this.legend = ['сдало', 'не сдало', 'отсутствовало'];
        this.classes = 'app-school-report list-item-link';
    }
    SchoolReportComponent.prototype.onNavigate = function () {
        this.navigate.emit(this.schoolReport.SchoolId);
    };
    Object.defineProperty(SchoolReportComponent.prototype, "values", {
        get: function () {
            return [this.schoolReport.Report.Pass, this.schoolReport.Report.NotPass, this.schoolReport.Report.Absent];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "schoolReport", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "navigate", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "classes", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SchoolReportComponent.prototype, "onNavigate", null);
    SchoolReportComponent = __decorate([
        Component({
            selector: 'app-school-report',
            template: "\n<h4>{{ schoolReport.SchoolName }}</h4>\n<app-stacked-bar [values]=\"values\" [colorScheme]=\"colorScheme\" [legend]=\"legend\"></app-stacked-bar>\n",
            styles: [
                "\n:host {\n\tdisplay: block;\n\tpadding: 10px 15px !important;\n    border: 1px solid #eee !important;\n    border-radius: 5px !important;\n\tcursor: pointer;\n}"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], SchoolReportComponent);
    return SchoolReportComponent;
}());
export { SchoolReportComponent };
//# sourceMappingURL=school-report.component.js.map