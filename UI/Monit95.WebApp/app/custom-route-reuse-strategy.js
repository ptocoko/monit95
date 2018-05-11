"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomReuseStrategy = /** @class */ (function () {
    function CustomReuseStrategy() {
        this.handlers = {};
    }
    CustomReuseStrategy.prototype.shouldDetach = function (route) {
        return ['rsur/results-list'].indexOf(route.routeConfig.path) > -1;
    };
    CustomReuseStrategy.prototype.store = function (route, handle) {
        this.handlers[route.routeConfig.path] = handle;
    };
    CustomReuseStrategy.prototype.shouldAttach = function (route) {
        return !!this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.retrieve = function (route) {
        if (route.routeConfig) {
            return this.handlers[route.routeConfig.path];
        }
    };
    CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return future.routeConfig === curr.routeConfig;
    };
    return CustomReuseStrategy;
}());
exports.CustomReuseStrategy = CustomReuseStrategy;
//# sourceMappingURL=custom-route-reuse-strategy.js.map