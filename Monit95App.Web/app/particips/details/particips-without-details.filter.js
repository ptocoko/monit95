"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/Rx");
var ParticipsWithoutDetailsPipe = (function () {
    function ParticipsWithoutDetailsPipe() {
    }
    ParticipsWithoutDetailsPipe.prototype.transform = function (particips, showOnlyWithoutDetails) {
        if (particips == null || showOnlyWithoutDetails == null)
            return particips;
        if (showOnlyWithoutDetails)
            return particips.filter(function (particip) { return particip.birthday == null || particip.classNumbers == null; });
        else
            return particips;
    };
    return ParticipsWithoutDetailsPipe;
}());
ParticipsWithoutDetailsPipe = __decorate([
    core_1.Pipe({ name: 'participsWithoutDetails' })
], ParticipsWithoutDetailsPipe);
exports.ParticipsWithoutDetailsPipe = ParticipsWithoutDetailsPipe;
//# sourceMappingURL=particips-without-details.filter.js.map