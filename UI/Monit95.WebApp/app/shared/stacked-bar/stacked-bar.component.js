"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackedBarComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var StackedBarComponent = /** @class */ (function () {
    function StackedBarComponent() {
    }
    StackedBarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['values'] || changes['legend'] || changes['colorScheme']) {
            var sumOfValues_1 = this.values.reduce(function (curr, aggr) { return aggr += curr; }, 0);
            this.percentsAndValues = this.values.map(function (val, i) {
                var percentToView = Math.round((val / sumOfValues_1) * 100) + '';
                if (percentToView === '0') {
                    percentToView = '';
                }
                else {
                    percentToView += '%';
                }
                return {
                    percent: val / sumOfValues_1,
                    value: val,
                    percentToView: percentToView,
                    legend: _this.legend[i],
                    backColor: _this.colorScheme[i]
                };
            });
        }
    };
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Array)
    ], StackedBarComponent.prototype, "values", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Array)
    ], StackedBarComponent.prototype, "colorScheme", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Array)
    ], StackedBarComponent.prototype, "legend", void 0);
    StackedBarComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'app-stacked-bar',
            templateUrl: "./app/shared/stacked-bar/stacked-bar.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/shared/stacked-bar/stacked-bar.component.css?v=".concat(new Date().getTime())],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], StackedBarComponent);
    return StackedBarComponent;
}());
exports.StackedBarComponent = StackedBarComponent;
//# sourceMappingURL=stacked-bar.component.js.map