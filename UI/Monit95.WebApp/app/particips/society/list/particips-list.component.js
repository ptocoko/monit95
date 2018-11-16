"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particip_service_1 = require("../../../services/particip.service");
var PROJECT_ID = 20;
var SocietyParticipsListComponent = /** @class */ (function () {
    function SocietyParticipsListComponent(participService) {
        this.participService = participService;
    }
    SocietyParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getByProjectId(PROJECT_ID).subscribe(function (res) { return _this.particips = res; });
    };
    SocietyParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/society/list/particips-list.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService])
    ], SocietyParticipsListComponent);
    return SocietyParticipsListComponent;
}());
exports.SocietyParticipsListComponent = SocietyParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map