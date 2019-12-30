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
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
// Services
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { AccountService } from '../../../../../services/account.service';
import { SchoolCollectorService } from '../../../../../shared/school-collector.service';
var COLLECTOR_ID = 5;
var HiringListComponent = /** @class */ (function () {
    function HiringListComponent(rsurParticipService, accauntService, snackBar, dialog, collectorService) {
        this.rsurParticipService = rsurParticipService;
        this.accauntService = accauntService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.collectorService = collectorService;
        this.particips = [];
        this.isLoading = true;
        this.isFinished = false;
    }
    HiringListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectorService.getCollectorState(COLLECTOR_ID).subscribe(function (state) {
            _this.isFinished = state.IsFinished;
            if (!_this.isFinished) {
                _this.getParticips();
            }
        });
    };
    HiringListComponent.prototype.getParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.filter(function (f) { return f.ActualCode === 1 || f.ActualCode === 3 || f.ActualCode === 4; });
            _this.particips = _this.particips.sort(function (p1, p2) { return p2.RsurSubjectCode - p1.RsurSubjectCode; });
            _this.isLoading = false;
        });
    };
    HiringListComponent.prototype.cancelHiring = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "'? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                //if (particip.ActualCode === 3) {
                //	const part = {
                //		ActualCode: 2,
                //		SchoolId: particip.SchoolIdFrom
                //	} as RsurParticipModel;
                //	this.rsurParticipService.update(particip.Code, part).subscribe(() => this.deleteItem(particip.Code));
                //} else if (particip.ActualCode === 4) {
                //	this.rsurParticipService.delete(particip.Code).subscribe(() => this.deleteItem(particip.Code));
                //}
                if (particip.RsurSubjectCode === 12) {
                    _this.rsurParticipService.delete(particip.Code).subscribe(function () { return _this.deleteItem(particip.Code); });
                }
            }
        });
    };
    HiringListComponent.prototype.finish = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0438\u0442\u0435\u043B\u0435\u0439 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E\u0437\u043D\u0430\u043D\u0438\u044F?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(function () { return _this.isFinished = true; });
            }
        });
    };
    HiringListComponent.prototype.notFinish = function () {
        var _this = this;
        this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(function () { return _this.isFinished = false; });
        this.ngOnInit();
    };
    HiringListComponent.prototype.deleteItem = function (itemCode) {
        var partIndex = this.particips.findIndex(function (p) { return p.Code === itemCode; });
        this.particips.splice(partIndex, 1);
    };
    HiringListComponent = __decorate([
        Component({
            selector: 'rsur/particips',
            templateUrl: './hiring-list.component.html',
            styleUrls: ['./hiring-list.component.css']
        }),
        __metadata("design:paramtypes", [RsurParticipService,
            AccountService,
            MatSnackBar,
            MatDialog,
            SchoolCollectorService])
    ], HiringListComponent);
    return HiringListComponent;
}());
export { HiringListComponent };
;
//function defaultFilterPredicate(data: RsurParticipModel, filter: string): boolean {
//	if (!filter || filter === '') return true;
//	return data.Code.toString().indexOf(filter) > -1
//		|| data.SchoolParticipInfo.Surname.toLowerCase().indexOf(filter) > -1
//		|| data.SchoolParticipInfo.Name.toLowerCase().indexOf(filter) > -1
//		|| data.SchoolParticipInfo.SchoolName.toLowerCase().indexOf(filter) > -1
//		|| data.RsurSubjectName.toLowerCase().indexOf(filter) > -1;
//}
//# sourceMappingURL=hiring-list.component.js.map