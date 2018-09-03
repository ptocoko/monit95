"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var actualization_service_1 = require("../../../../../services/rsur/actualization.service");
var FiringListComponent = /** @class */ (function () {
    function FiringListComponent(rsurParticipService, actualizationService) {
        this.rsurParticipService = rsurParticipService;
        this.actualizationService = actualizationService;
    }
    FiringListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.actualizationService.getActualizeStatus().subscribe(function (status) {
            _this.isActualizing = status;
            if (status) {
                _this.rsurParticipService.getAll().subscribe(function (res) {
                    _this.particips = res;
                });
            }
        });
    };
    FiringListComponent.prototype.fire = function (particip) {
        var _this = this;
        var firedParticip = tslib_1.__assign({}, particip, { ActualCode: 0 });
        this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
            _this.particips.find(function (prt) { return prt.Code === particip.Code; }).ActualCode === 0;
        });
    };
    FiringListComponent.prototype.cancelFiring = function (particip) {
        var _this = this;
        var firedParticip = tslib_1.__assign({}, particip, { ActualCode: 1 });
        this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
            _this.particips.find(function (prt) { return prt.Code === particip.Code; }).ActualCode === 1;
        });
    };
    FiringListComponent.prototype.endFiring = function () {
        var _this = this;
        this.actualizationService.endActualization().subscribe(function () { return _this.isActualizing = false; });
    };
    FiringListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/actualization/firing/list/firing-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/firing/list/firing-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            actualization_service_1.ActualizationService])
    ], FiringListComponent);
    return FiringListComponent;
}());
exports.FiringListComponent = FiringListComponent;
//# sourceMappingURL=firing-list.component.js.map