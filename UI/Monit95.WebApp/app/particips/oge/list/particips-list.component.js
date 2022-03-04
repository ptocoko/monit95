"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OgeParticipsListComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particip_service_1 = require("../../../services/particip.service");
var OgeParticipsListComponent = /** @class */ (function () {
    function OgeParticipsListComponent(participService) {
        this.participService = participService;
    }
    OgeParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getAllOge().subscribe(function (res) { return _this.particips = res; });
    };
    OgeParticipsListComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/particips/oge/list/particips-list.component.html?v=".concat(new Date().getTime())
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService])
    ], OgeParticipsListComponent);
    return OgeParticipsListComponent;
}());
exports.OgeParticipsListComponent = OgeParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map