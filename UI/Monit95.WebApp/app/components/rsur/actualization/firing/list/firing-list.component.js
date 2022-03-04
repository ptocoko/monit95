"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiringListComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../../../shared/confirm-dialog/confirm-dialog.component");
var school_collector_service_1 = require("../../../../../shared/school-collector.service");
var COLLECTOR_ID = 2;
var FiringListComponent = /** @class */ (function () {
    function FiringListComponent(rsurParticipService, schoolCollectorService, dialog) {
        this.rsurParticipService = rsurParticipService;
        this.schoolCollectorService = schoolCollectorService;
        this.dialog = dialog;
        this.isActualizing = true;
        this.isLoading = false;
    }
    FiringListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schoolCollectorService.getCollectorState(COLLECTOR_ID).subscribe(function (state) {
            _this.isActualizing = !state.IsFinished;
            if (_this.isActualizing) {
                _this.isLoading = true;
                _this.rsurParticipService.getAll().subscribe(function (res) {
                    _this.particips = res.filter(function (f) { return f.ActualCode === 1 || f.ActualCode === 2; });
                    _this.isLoading = false;
                });
            }
        });
    };
    FiringListComponent.prototype.fire = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '".concat(particip.SchoolParticipInfo.Surname, " ").concat(particip.SchoolParticipInfo.Name, " ").concat(particip.SchoolParticipInfo.SecondName, "' \u0438\u0437 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?") }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = tslib_1.__assign(tslib_1.__assign({}, particip), { ActualCode: 2 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    var participIndex = _this.particips.findIndex(function (prt) { return prt.Code === particip.Code; });
                    _this.particips[participIndex].ActualCode = 2;
                });
            }
        });
    };
    FiringListComponent.prototype.cancelFiring = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '".concat(particip.SchoolParticipInfo.Surname, " ").concat(particip.SchoolParticipInfo.Name, " ").concat(particip.SchoolParticipInfo.SecondName, "' \u0432 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443?") }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = tslib_1.__assign(tslib_1.__assign({}, particip), { ActualCode: 1 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    var participIndex = _this.particips.findIndex(function (prt) { return prt.Code === particip.Code; });
                    _this.particips[participIndex].ActualCode = 1;
                });
            }
        });
    };
    FiringListComponent.prototype.endFiring = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u044D\u0442\u0430\u043F 1?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(function () { return _this.isActualizing = false; });
            }
        });
    };
    FiringListComponent.prototype.notEnded = function () {
        var _this = this;
        this.schoolCollectorService.isFinished(COLLECTOR_ID, false).subscribe(function () { return _this.ngOnInit(); });
    };
    FiringListComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/rsur/actualization/firing/list/firing-list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/actualization/firing/list/firing-list.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            school_collector_service_1.SchoolCollectorService,
            material_1.MatDialog])
    ], FiringListComponent);
    return FiringListComponent;
}());
exports.FiringListComponent = FiringListComponent;
//# sourceMappingURL=firing-list.component.js.map