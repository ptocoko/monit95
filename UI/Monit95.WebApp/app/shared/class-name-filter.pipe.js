"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ClassNameFilterPipe = (function () {
    function ClassNameFilterPipe() {
    }
    ClassNameFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText === 'Все классы' || searchText == null)
            return particips;
        return particips.filter(function (particip) { return particip.ClassName.trim() == searchText; });
    };
    return ClassNameFilterPipe;
}());
ClassNameFilterPipe = tslib_1.__decorate([
    core_1.Pipe({ name: 'classNameFilter' })
], ClassNameFilterPipe);
exports.ClassNameFilterPipe = ClassNameFilterPipe;
//# sourceMappingURL=class-name-filter.pipe.js.map