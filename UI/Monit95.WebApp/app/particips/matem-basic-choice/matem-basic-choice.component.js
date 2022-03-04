"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatemBasicChoice = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particip_service_1 = require("../../services/particip.service");
var MatemBasicChoice = /** @class */ (function () {
    function MatemBasicChoice(participService) {
        this.participService = participService;
    }
    MatemBasicChoice.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getAll().subscribe(function (res) { return _this.particips = res; });
    };
    MatemBasicChoice = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/particips/matem-basic-choice/matem-basic-choice.component.html?v=".concat(new Date().getTime())
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService])
    ], MatemBasicChoice);
    return MatemBasicChoice;
}());
exports.MatemBasicChoice = MatemBasicChoice;
//# sourceMappingURL=matem-basic-choice.component.js.map