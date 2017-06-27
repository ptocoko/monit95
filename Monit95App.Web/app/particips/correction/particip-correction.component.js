"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var particip_correction_service_1 = require("./particip-correction.service");
var ParticipCorrectionComponent = (function () {
    function ParticipCorrectionComponent(_participCorrectionService) {
        this._participCorrectionService = _participCorrectionService;
        this.participCorrections = [];
    }
    ParticipCorrectionComponent.prototype.ngOnInit = function () {
        this.getCorrections();
    };
    ParticipCorrectionComponent.prototype.getCorrections = function () {
        var _this = this;
        this._participCorrectionService.getCorrections().then(function (result) { return _this.participCorrections = result; });
    };
    ;
    ParticipCorrectionComponent.prototype.applyCorrection = function (correction) {
        this._participCorrectionService.applyCorrection(correction);
    };
    return ParticipCorrectionComponent;
}());
ParticipCorrectionComponent = __decorate([
    core_1.Component({
        selector: 'particip-correction',
        templateUrl: './app/particips/correction/particip-correction.html',
        providers: [particip_correction_service_1.ParticipCorrectionService]
    }),
    __metadata("design:paramtypes", [particip_correction_service_1.ParticipCorrectionService])
], ParticipCorrectionComponent);
exports.ParticipCorrectionComponent = ParticipCorrectionComponent;
//# sourceMappingURL=particip-correction.component.js.map