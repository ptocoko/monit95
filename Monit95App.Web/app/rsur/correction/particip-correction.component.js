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
var rsurparticip_service_1 = require("../rsurparticip.service");
var ParticipCorrectionComponent = (function () {
    function ParticipCorrectionComponent(_participCorrectionService, _participService) {
        this._participCorrectionService = _participCorrectionService;
        this._participService = _participService;
        this.participCorrections = [];
        this.statusText = "";
    }
    ParticipCorrectionComponent.prototype.ngOnInit = function () {
        this.getCorrections();
    };
    ParticipCorrectionComponent.prototype.getCorrections = function () {
        var _this = this;
        this._participCorrectionService.getCorrections().subscribe(function (participsCorrections) { return _this.participCorrections = participsCorrections; }, function (error) { throw error; }, function () {
            if (_this.participCorrections.length === 0)
                _this.statusText = "Запросов на корректировку данных нет!";
        });
    };
    ;
    //   applyCorrection(correction: ParticipCorrection) {
    //	this._participService.getParticip(correction.participCode).subscribe(particip => {
    //		particip.surname = correction.newParticipSurname;
    //		particip.name = correction.newParticipName;
    //		particip.secondName = correction.newParticipSecondName;
    //		this._participService.updateParticip(particip).subscribe(success => {
    //			this._participCorrectionService.cancelCorrection(correction.participCode).subscribe(success => this.successHandler(correction, 'Коррекция принята успешно!'))
    //		})
    //	});
    //}
    ParticipCorrectionComponent.prototype.cancelCorrection = function (correction) {
        var _this = this;
        this._participCorrectionService.cancelCorrection(correction.participCode).subscribe(function (success) {
            _this.successHandler(correction, 'Коррекция отменена!');
        });
    };
    ParticipCorrectionComponent.prototype.successHandler = function (correction, statusText) {
        var index = this.participCorrections.indexOf(correction);
        this.participCorrections.splice(index, 1);
        this.statusText = statusText;
    };
    return ParticipCorrectionComponent;
}());
ParticipCorrectionComponent = __decorate([
    core_1.Component({
        selector: "particip-correction",
        templateUrl: "./app/rsur/correction/particip-correction.html",
        providers: [particip_correction_service_1.ParticipCorrectionService]
    }),
    __metadata("design:paramtypes", [particip_correction_service_1.ParticipCorrectionService, rsurparticip_service_1.RsurParticipService])
], ParticipCorrectionComponent);
exports.ParticipCorrectionComponent = ParticipCorrectionComponent;
//# sourceMappingURL=particip-correction.component.js.map