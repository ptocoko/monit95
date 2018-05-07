"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particips_service_1 = require("../../../services/one-two-three/particips.service");
var table_paginator_1 = require("../../../shared/table-paginator/table-paginator");
var Subject_1 = require("rxjs/Subject");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var merge_1 = require("rxjs/observable/merge");
var startWith_1 = require("rxjs/operators/startWith");
var switchMap_1 = require("rxjs/operators/switchMap");
var map_1 = require("rxjs/operators/map");
var class_service_1 = require("../../../services/class.service");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var account_service_1 = require("../../../services/account.service");
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, classService, dialog, snackBar, accountService) {
        this.participService = participService;
        this.classService = classService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.accountService = accountService;
        this.particips = [];
        this.classes = [];
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.participsLength = 0;
        this.isFailingSchool = false;
        this.selectionChange$ = new Subject_1.Subject();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.isFailingSchool = ["0303", "0302", "0331", "0587", "0001", "0613", "0289"].indexOf(this.accountService.account.UserName) > 0;
        var search$ = fromEvent_1.fromEvent(this.searchField.nativeElement, 'input')
            .pipe(debounceTime_1.debounceTime(1000));
        search$.subscribe(function () { return _this.pageIndex = 0; });
        merge_1.merge(this.paginator.page, search$, this.selectionChange$)
            .pipe(startWith_1.startWith({}), switchMap_1.switchMap(function () {
            _this.isLoading = true;
            return _this.createRequest();
        }), map_1.map(function (data) {
            _this.isLoading = false;
            _this.participsLength = data.TotalCount;
            _this.classes = data.Classes;
            return data.Items;
        })).subscribe(function (particips) { return _this.particips = particips; });
        //this.participService.getAll().subscribe(res => {
        //	this.particips = res;
        //	this.isLoading = false;
        //});
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
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.Surname + " " + particip.Name + " " + particip.SecondName + "' \u0438\u0437 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.participService.deleteParticip(participId).subscribe(function () {
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
    tslib_1.__decorate([
        core_1.ViewChild(table_paginator_1.TablePaginator),
        tslib_1.__metadata("design:type", table_paginator_1.TablePaginator)
    ], ParticipsListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ParticipsListComponent.prototype, "searchField", void 0);
    ParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/particips/list/particips-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/one-two-three/particips/list/particips-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService,
            class_service_1.ClassService,
            material_1.MatDialog,
            material_1.MatSnackBar,
            account_service_1.AccountService])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map