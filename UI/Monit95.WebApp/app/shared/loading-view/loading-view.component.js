"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var LoadingViewComponent = /** @class */ (function () {
    function LoadingViewComponent() {
    }
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], LoadingViewComponent.prototype, "caption", void 0);
    LoadingViewComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'spinner-view',
            templateUrl: "./app/shared/loading-view/loading-view.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/shared/loading-view/loading-view.component.css?v=" + new Date().getTime()]
        })
    ], LoadingViewComponent);
    return LoadingViewComponent;
}());
exports.LoadingViewComponent = LoadingViewComponent;
//# sourceMappingURL=loading-view.component.js.map