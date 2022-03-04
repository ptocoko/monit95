"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingViewComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var LoadingViewComponent = /** @class */ (function () {
    function LoadingViewComponent() {
    }
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", String)
    ], LoadingViewComponent.prototype, "caption", void 0);
    LoadingViewComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'spinner-view',
            templateUrl: "./app/shared/loading-view/loading-view.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/shared/loading-view/loading-view.component.css?v=".concat(new Date().getTime())]
        })
    ], LoadingViewComponent);
    return LoadingViewComponent;
}());
exports.LoadingViewComponent = LoadingViewComponent;
//# sourceMappingURL=loading-view.component.js.map