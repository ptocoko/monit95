"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var StackedBarComponent = /** @class */ (function () {
    function StackedBarComponent() {
    }
    StackedBarComponent.prototype.ngOnChanges = function (changes) {
        if (changes['values']) {
            var sumOfValues_1 = this.values.reduce(function (curr, aggr) { return aggr += curr; }, 0);
            this.percentsAndValues = this.values.map(function (val) {
                return {
                    percent: val / sumOfValues_1,
                    value: val
                };
            });
        }
    };
    StackedBarComponent.prototype.getColorFromScheme = function (index) {
        return this.colorScheme[index];
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], StackedBarComponent.prototype, "values", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], StackedBarComponent.prototype, "colorScheme", void 0);
    StackedBarComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-stacked-bar',
            templateUrl: "./app/shared/stacked-bar/stacked-bar.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/shared/stacked-bar/stacked-bar.component.css?v=" + new Date().getTime()]
        })
    ], StackedBarComponent);
    return StackedBarComponent;
}());
exports.StackedBarComponent = StackedBarComponent;
//# sourceMappingURL=stacked-bar.components.js.map