"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ParticipsWithoutDetailsPipe = /** @class */ (function () {
    function ParticipsWithoutDetailsPipe() {
    }
    ParticipsWithoutDetailsPipe.prototype.transform = function (particips, showOnlyWithoutDetails) {
        if (particips == null || showOnlyWithoutDetails == null)
            return particips;
        if (showOnlyWithoutDetails)
            return particips.filter(function (particip) { return particip.Birthday == null || particip.ClassNumbers == null; });
        else
            return particips;
    };
    ParticipsWithoutDetailsPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'participsWithoutDetails' })
    ], ParticipsWithoutDetailsPipe);
    return ParticipsWithoutDetailsPipe;
}());
exports.ParticipsWithoutDetailsPipe = ParticipsWithoutDetailsPipe;
//# sourceMappingURL=particips-without-details.filter.js.map