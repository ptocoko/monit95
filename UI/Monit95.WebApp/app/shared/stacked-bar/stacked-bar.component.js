var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], StackedBarComponent.prototype, "values", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], StackedBarComponent.prototype, "colorScheme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], StackedBarComponent.prototype, "legend", void 0);
    StackedBarComponent = __decorate([
        Component({
            selector: 'app-stacked-bar',
            templateUrl: './stacked-bar.component.html',
            styleUrls: ['./stacked-bar.component.css'],
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], StackedBarComponent);
    return StackedBarComponent;
}());
export { StackedBarComponent };
//# sourceMappingURL=stacked-bar.component.js.map