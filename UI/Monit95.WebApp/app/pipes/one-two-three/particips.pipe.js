"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ClassFilterPipe = /** @class */ (function () {
    function ClassFilterPipe() {
    }
    ClassFilterPipe.prototype.transform = function (particips, classId) {
        if (!classId || !particips)
            return particips;
        return particips.filter(function (particip) { return particip.ClassId === classId; });
    };
    ClassFilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'class-filter'
        })
    ], ClassFilterPipe);
    return ClassFilterPipe;
}());
exports.ClassFilterPipe = ClassFilterPipe;
//# sourceMappingURL=particips.pipe.js.map