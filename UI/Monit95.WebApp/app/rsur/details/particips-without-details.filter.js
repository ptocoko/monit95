"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ParticipsWithoutDetailsPipe = (function () {
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
    return ParticipsWithoutDetailsPipe;
}());
ParticipsWithoutDetailsPipe = tslib_1.__decorate([
    core_1.Pipe({ name: 'participsWithoutDetails' })
], ParticipsWithoutDetailsPipe);
exports.ParticipsWithoutDetailsPipe = ParticipsWithoutDetailsPipe;
//# sourceMappingURL=particips-without-details.filter.js.map