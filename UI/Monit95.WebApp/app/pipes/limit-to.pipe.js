"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitToPipe = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var LimitToPipe = /** @class */ (function () {
    function LimitToPipe() {
    }
    LimitToPipe.prototype.transform = function (array, limit) {
        if (limit == null || array == null)
            return array;
        return array.slice(0, limit);
    };
    LimitToPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'limitTo' })
    ], LimitToPipe);
    return LimitToPipe;
}());
exports.LimitToPipe = LimitToPipe;
//# sourceMappingURL=limit-to.pipe.js.map