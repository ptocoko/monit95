"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SchoolReportComponent = /** @class */ (function () {
    function SchoolReportComponent() {
        this.navigate = new core_1.EventEmitter();
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
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "schoolReport", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "navigate", void 0);
    tslib_1.__decorate([
        core_1.HostBinding('class'),
        tslib_1.__metadata("design:type", Object)
    ], SchoolReportComponent.prototype, "classes", void 0);
    tslib_1.__decorate([
        core_1.HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SchoolReportComponent.prototype, "onNavigate", null);
    SchoolReportComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-school-report',
            template: "\n<h4>{{ schoolReport.SchoolName }}</h4>\n<app-stacked-bar [values]=\"values\" [colorScheme]=\"colorScheme\" [legend]=\"legend\"></app-stacked-bar>\n",
            styles: [
                "\n:host {\n\tdisplay: block;\n\tpadding: 10px 15px !important;\n    border: 1px solid #eee !important;\n    border-radius: 5px !important;\n\tcursor: pointer;\n}"
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SchoolReportComponent);
    return SchoolReportComponent;
}());
exports.SchoolReportComponent = SchoolReportComponent;
//# sourceMappingURL=school-report.component.js.map