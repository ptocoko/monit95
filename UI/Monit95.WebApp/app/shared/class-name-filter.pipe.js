"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ClassNameFilterPipe = /** @class */ (function () {
    function ClassNameFilterPipe() {
    }
    ClassNameFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText === 'Все классы' || searchText == null)
            return particips;
        return particips.filter(function (particip) { return particip.ClassName.trim() == searchText; });
    };
    ClassNameFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'classNameFilter' })
    ], ClassNameFilterPipe);
    return ClassNameFilterPipe;
}());
exports.ClassNameFilterPipe = ClassNameFilterPipe;
//# sourceMappingURL=class-name-filter.pipe.js.map