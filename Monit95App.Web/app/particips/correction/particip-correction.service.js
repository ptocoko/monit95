"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var particip_correction_mock_1 = require("./particip-correction.mock");
var ParticipCorrectionService = (function () {
    function ParticipCorrectionService() {
    }
    ParticipCorrectionService.prototype.getCorrections = function () {
        return Promise.resolve(particip_correction_mock_1.PARTICIPCORRECTIONS);
    };
    return ParticipCorrectionService;
}());
ParticipCorrectionService = __decorate([
    core_1.Injectable()
], ParticipCorrectionService);
exports.ParticipCorrectionService = ParticipCorrectionService;
//# sourceMappingURL=particip-correction.service.js.map