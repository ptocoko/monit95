"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var operators_1 = require("rxjs/operators");
var merge_1 = require("rxjs/observable/merge");
var material_1 = require("@angular/material");
var table_paginator_1 = require("../../../../shared/table-paginator/table-paginator");
var class_service_1 = require("../../../../services/class.service");
var account_service_1 = require("../../../../services/account.service");
var confirm_dialog_component_1 = require("../../../../shared/confirm-dialog/confirm-dialog.component");
var particips_service_1 = require("../../../../services/first-class/particips.service");
var local_storage_1 = require("../../../../utils/local-storage");
var school_collector_service_1 = require("../../../../shared/school-collector.service");
exports.CLASS_ID_KEY = 'FIRST_CLASS_ID';
var COLLECTOR_ID = 49;
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, classService, dialog, snackBar, accountService, collectorService) {
        this.participService = participService;
        this.classService = classService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.accountService = accountService;
        this.collectorService = collectorService;
        this.particips = [];
        this.classes = [];
        this.pageIndex = 0;
        this.limitToVal = 40;
        this.participsLength = 0;
        this.isFailingSchool = false;
        this.selectionChange$ = new Subject_1.Subject();
        this.isFinished$ = new Subject_1.Subject();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.collectorService.getCollectorState(COLLECTOR_ID).subscribe(function (state) {
            _this.isFinished = state.IsFinished;
            if (!_this.isFinished) {
                _this.searchClass = local_storage_1.getFromLocalStorage(exports.CLASS_ID_KEY);
                var search$ = fromEvent_1.fromEvent(_this.searchField.nativeElement, 'input')
                    .pipe(operators_1.debounceTime(1000));
                search$.subscribe(function () { return _this.pageIndex = 0; });
                merge_1.merge(_this.paginator.page, search$, _this.selectionChange$)
                    .pipe(operators_1.startWith({}), operators_1.switchMap(function () {
                    _this.isLoading = true;
                    return _this.createRequest();
                }), operators_1.map(function (data) {
                    _this.isLoading = false;
                    _this.participsLength = data.TotalCount;
                    _this.classes = data.Classes;
                    return data.Items;
                }), operators_1.takeUntil(_this.isFinished$)).subscribe(function (particips) { return _this.particips = particips; });
            }
        });
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
        particip.isDeleting = true;
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
                    particip.isDeleting = false;
                    _this.particips.splice(participIndex, 1);
                    _this.snackBar.open('участник исключен из диагностики', 'OK', { duration: 3000 });
                });
            }
            else {
                particip.isDeleting = false;
            }
        });
    };
    ParticipsListComponent.prototype.selectionChange = function () {
        this.pageIndex = 0;
        if (this.searchClass) {
            local_storage_1.setToLocalStorage(exports.CLASS_ID_KEY, this.searchClass);
        }
        else {
            local_storage_1.removeFromLocalStorage(exports.CLASS_ID_KEY);
        }
        this.selectionChange$.next({});
    };
    ParticipsListComponent.prototype.finish = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(function () {
                    _this.isFinished = true;
                    _this.isFinished$.next();
                });
            }
        });
    };
    ParticipsListComponent.prototype.notFinished = function () {
        var _this = this;
        this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(function () {
            _this.isFinished = false;
            _this.ngOnInit();
        });
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
            templateUrl: "./app/components/first-class/particips/list/particips-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/first-class/particips/list/particips-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService,
            class_service_1.ClassService,
            material_1.MatDialog,
            material_1.MatSnackBar,
            account_service_1.AccountService,
            school_collector_service_1.SchoolCollectorService])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map