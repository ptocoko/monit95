var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { SchoolCollectorService } from '../../../../../shared/school-collector.service';
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
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "' \u0438\u0437 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = __assign({}, particip, { ActualCode: 2 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    var participIndex = _this.particips.findIndex(function (prt) { return prt.Code === particip.Code; });
                    _this.particips[participIndex].ActualCode = 2;
                });
            }
        });
    };
    FiringListComponent.prototype.cancelFiring = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "' \u0432 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                var firedParticip = __assign({}, particip, { ActualCode: 1 });
                _this.rsurParticipService.update(particip.Code, firedParticip).subscribe(function () {
                    var participIndex = _this.particips.findIndex(function (prt) { return prt.Code === particip.Code; });
                    _this.particips[participIndex].ActualCode = 1;
                });
            }
        });
    };
    FiringListComponent.prototype.endFiring = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
    FiringListComponent = __decorate([
        Component({
            templateUrl: './firing-list.component.html',
            styleUrls: ['./firing-list.component.css']
        }),
        __metadata("design:paramtypes", [RsurParticipService,
            SchoolCollectorService,
            MatDialog])
    ], FiringListComponent);
    return FiringListComponent;
}());
export { FiringListComponent };
//# sourceMappingURL=firing-list.component.js.map