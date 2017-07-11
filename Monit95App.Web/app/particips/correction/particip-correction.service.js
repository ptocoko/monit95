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
var http_1 = require("@angular/http");
require("rxjs/Rx");
var particip_correction_1 = require("./particip-correction");
var ParticipCorrectionService = (function () {
    function ParticipCorrectionService(_http) {
        this._http = _http;
    }
    ParticipCorrectionService.prototype.getCorrections = function () {
        return this._http.get('/api/RsurParticipEdit/Get').map(function (resp) {
            var models = resp.json();
            var particips = new Array();
            for (var index in models) {
                var model = models[index];
                var particip = new particip_correction_1.ParticipCorrection();
                particip.participCode = model.ParticipCode;
                particip.oldParticipSurname = model.OldParticipSurname;
                particip.newParticipSurname = model.NewParticipSurname;
                particip.oldParticipName = model.OldParticipName;
                particip.newParticipName = model.NewParticipName;
                particip.oldParticipSecondName = model.OldParticipSecondName;
                particip.newParticipSecondName = model.NewParticipSecondName;
                particips.push(particip);
            }
            return particips;
        });
    };
    ParticipCorrectionService.prototype.cancelCorrection = function (participCode) {
        return this._http.delete('/api/RsurParticipEdit/Cancel?participCode=' + participCode);
    };
    return ParticipCorrectionService;
}());
ParticipCorrectionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ParticipCorrectionService);
exports.ParticipCorrectionService = ParticipCorrectionService;
//# sourceMappingURL=particip-correction.service.js.map