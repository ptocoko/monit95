"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var OffsetPipe = /** @class */ (function () {
    function OffsetPipe() {
    }
    OffsetPipe.prototype.transform = function (values, offset) {
        if (!values || !offset)
            return values;
        return values.slice(offset, values.length);
    };
    OffsetPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'offset'
        })
    ], OffsetPipe);
    return OffsetPipe;
}());
exports.OffsetPipe = OffsetPipe;
//# sourceMappingURL=offset.pipe.js.map