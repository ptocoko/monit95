"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particips_service_1 = require("../../../services/one-two-three/particips.service");
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService) {
        this.participService = participService;
        this.particip = [];
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getAll().subscribe(function (res) {
            _this.particip = res;
        });
    };
    ParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/particips/list/particips-list.component.html?v=" + new Date().getTime(),
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map