"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ParticipPipe = (function () {
    function ParticipPipe() {
    }
    ParticipPipe.prototype.transform = function (particips, searchText) {
        if (searchText == null)
            return particips;
        return particips.filter(function (particip) {
            return particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
    };
    return ParticipPipe;
}());
ParticipPipe = __decorate([
    core_1.Pipe({ name: 'particip' })
], ParticipPipe);
exports.ParticipPipe = ParticipPipe;
//# sourceMappingURL=particip.pipe.js.map