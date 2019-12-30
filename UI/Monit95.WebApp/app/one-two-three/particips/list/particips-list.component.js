var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { TablePaginator } from '../../../shared/table-paginator/table-paginator';
import { Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, startWith, switchMap, map } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { AccountService } from '../../../services/account.service';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
var COLLECTOR_ID = 46;
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, dialog, snackBar, accountService, collectorService) {
        this.participService = participService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.accountService = accountService;
        this.collectorService = collectorService;
        this.particips = [];
        this.classes = [];
        this.isLoading = true;
        this.isFinished = false;
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.participsLength = 0;
        this.isFailingSchool = false;
        this.selectionChange$ = new Subject();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectorGetSub$ = this.collectorService.getCollectorState(COLLECTOR_ID)
            .subscribe(function (state) { return _this.isFinished = state.IsFinished; });
        var search$ = fromEvent(this.searchField.nativeElement, 'input')
            .pipe(debounceTime(1000));
        this.searchSub$ = search$.subscribe(function () { return _this.pageIndex = 0; });
        this.participsSub$ = merge(this.paginator.page, search$, this.selectionChange$)
            .pipe(startWith({}), switchMap(function () {
            _this.isLoading = true;
            return _this.createRequest();
        }), map(function (data) {
            _this.isLoading = false;
            _this.participsLength = data.TotalCount;
            _this.classes = data.Classes;
            return data.Items;
        })).subscribe(function (particips) { return _this.particips = particips; });
    };
    ParticipsListComponent.prototype.createRequest = function () {
        return this.participService.getAll({
            page: this.pageIndex + 1,
            length: this.limitToVal,
            search: this.searchText,
            classId: this.searchClass
        });
    };
    ParticipsListComponent.prototype.deleteParticip = function (particip) {
        var _this = this;
        var participId = particip.Id;
        var participIndex = this.particips.indexOf(particip);
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.Surname + " " + particip.Name + " " + particip.SecondName + "' \u0438\u0437 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.participDelSub$ = _this.participService.deleteParticip(participId).subscribe(function () {
                    _this.particips.splice(participIndex, 1);
                    _this.snackBar.open('участник исключен из диагностики', 'OK', { duration: 3000 });
                });
            }
        });
    };
    ParticipsListComponent.prototype.selectionChange = function () {
        this.pageIndex = 0;
        this.selectionChange$.next({});
    };
    ParticipsListComponent.prototype.finish = function () {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.setCollectorState(true);
            }
        });
    };
    ParticipsListComponent.prototype.notFinish = function () {
        this.setCollectorState(false);
    };
    ParticipsListComponent.prototype.setCollectorState = function (state) {
        var _this = this;
        this.collectorSetSub$ = this.collectorService.isFinished(COLLECTOR_ID, state)
            .subscribe(function () { return _this.isFinished = state; });
    };
    ParticipsListComponent.prototype.ngOnDestroy = function () {
        if (this.participsSub$)
            this.participsSub$.unsubscribe();
        if (this.searchSub$)
            this.searchSub$.unsubscribe();
        if (this.participDelSub$)
            this.participDelSub$.unsubscribe();
        if (this.collectorSetSub$)
            this.collectorSetSub$.unsubscribe();
        if (this.collectorGetSub$)
            this.collectorGetSub$.unsubscribe();
    };
    __decorate([
        ViewChild(TablePaginator),
        __metadata("design:type", TablePaginator)
    ], ParticipsListComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild('searchField'),
        __metadata("design:type", ElementRef)
    ], ParticipsListComponent.prototype, "searchField", void 0);
    ParticipsListComponent = __decorate([
        Component({
            templateUrl: './particips-list.component.html',
            styleUrls: ['./particips-list.component.css']
        }),
        __metadata("design:paramtypes", [ParticipService,
            MatDialog,
            MatSnackBar,
            AccountService,
            SchoolCollectorService])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
export { ParticipsListComponent };
//# sourceMappingURL=particips-list.component.js.map