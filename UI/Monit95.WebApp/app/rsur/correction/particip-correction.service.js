"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
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
ParticipCorrectionService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [http_1.Http])
], ParticipCorrectionService);
exports.ParticipCorrectionService = ParticipCorrectionService;
//# sourceMappingURL=particip-correction.service.js.map