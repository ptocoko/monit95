"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var actualization_service_1 = require("../../../../../services/rsur/actualization.service");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../../../shared/confirm-dialog/confirm-dialog.component");
var FiringListComponent = /** @class */ (function () {
    function FiringListComponent(rsurParticipService, actualizationService, dialog) {
        this.rsurParticipService = rsurParticipService;
        this.actualizationService = actualizationService;
        this.dialog = dialog;
    }
    FiringListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.actualizationService.getActualizeStatus().subscribe(function (status) {
            _this.isActualizing = !status.IsFinished;
            if (status) {
                _this.rsurParticipService.getAll().subscribe(function (res) {
                    _this.particips = res;
                });
            }
        });
    };
    FiringListComponent.prototype.fire = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "' \u0438\u0437 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = tslib_1.__assign({}, particip, { ActualCode: 0 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    _this.particips.find(function (prt) { return prt.Code === particip.Code; }).ActualCode === 0;
                });
            }
        });
    };
    FiringListComponent.prototype.cancelFiring = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "' \u0432 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = tslib_1.__assign({}, particip, { ActualCode: 1 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    _this.particips.find(function (prt) { return prt.Code === particip.Code; }).ActualCode === 1;
                });
            }
        });
    };
    FiringListComponent.prototype.endFiring = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u044D\u0442\u0430\u043F 1? (\u044D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C)" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.actualizationService.endActualization().subscribe(function () { return _this.isActualizing = false; });
            }
        });
    };
    FiringListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/actualization/firing/list/firing-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/firing/list/firing-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            actualization_service_1.ActualizationService,
            material_1.MatDialog])
    ], FiringListComponent);
    return FiringListComponent;
}());
exports.FiringListComponent = FiringListComponent;
//# sourceMappingURL=firing-list.component.js.map