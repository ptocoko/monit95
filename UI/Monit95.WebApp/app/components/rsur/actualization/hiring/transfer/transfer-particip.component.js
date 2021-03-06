"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferParticipComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var school_service_1 = require("../../../../../school.service");
var area_service_1 = require("../../../../../services/area.service");
var Subject_1 = require("rxjs/Subject");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var merge_1 = require("rxjs/observable/merge");
var startWith_1 = require("rxjs/operators/startWith");
var switchMap_1 = require("rxjs/operators/switchMap");
var map_1 = require("rxjs/operators/map");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var table_paginator_1 = require("../../../../../shared/table-paginator/table-paginator");
var account_service_1 = require("../../../../../services/account.service");
var TransferParticipComponent = /** @class */ (function () {
    function TransferParticipComponent(schoolService, areaService, rsurParticipService, accountService) {
        this.schoolService = schoolService;
        this.areaService = areaService;
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.areas = [];
        this.schools = [];
        this.isLoading = false;
        this.pageIndex = 0;
        this.pageSize = 30;
        this.totalItems = 0;
        this.selectionChange$ = new Subject_1.Subject();
    }
    TransferParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.areaService.getAll().subscribe(function (areas) { return _this.areas = areas; });
        var search$ = (0, fromEvent_1.fromEvent)(this.searchField.nativeElement, 'keyup')
            .pipe((0, debounceTime_1.debounceTime)(1000));
        this.paginator.page.subscribe(function () { return window.scrollTo(0, 0); });
        (0, merge_1.merge)(search$, this.selectionChange$, this.paginator.page)
            .pipe((0, startWith_1.startWith)({}), (0, switchMap_1.switchMap)(function () {
            _this.isLoading = true;
            return _this.rsurParticipService.search(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ ActualCodes: [0, 2], Page: _this.pageIndex + 1, PageSize: _this.pageSize }, (_this.areaCode && { AreaCode: _this.areaCode })), (_this.schoolId && { SchoolId: _this.schoolId })), (_this.searchText && { Search: _this.searchText })));
        }), (0, map_1.map)(function (data) {
            _this.isLoading = false;
            _this.totalItems = data.TotalItems;
            return data.Items;
        })).subscribe(function (particips) { return _this.particips = particips; });
    };
    TransferParticipComponent.prototype.areaSelected = function (areaCode) {
        var _this = this;
        this.selectionChange$.next({});
        if (areaCode) {
            this.schoolService.getByAreaCode(areaCode).subscribe(function (schools) { return _this.schools = schools; });
        }
        else {
            this.schools = [];
        }
    };
    TransferParticipComponent.prototype.schoolSelected = function () {
        this.selectionChange$.next({});
    };
    TransferParticipComponent.prototype.hire = function (particip) {
        var part = {
            ActualCode: 3,
            SchoolId: this.accountService.account.UserName,
            SchoolIdFrom: particip.SchoolId
        };
        this.rsurParticipService.update(particip.Code, part).subscribe(function () { return particip.ActualCode = 3; });
    };
    TransferParticipComponent.prototype.cancelHiring = function (particip) {
        var part = {
            ActualCode: 2,
            SchoolId: particip.SchoolIdFrom
        };
        this.rsurParticipService.update(particip.Code, part).subscribe(function () { return particip.ActualCode = 2; });
    };
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", String)
    ], TransferParticipComponent.prototype, "searchText", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], TransferParticipComponent.prototype, "searchField", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)(table_paginator_1.TablePaginator),
        tslib_1.__metadata("design:type", table_paginator_1.TablePaginator)
    ], TransferParticipComponent.prototype, "paginator", void 0);
    TransferParticipComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'app-transfer-particip',
            templateUrl: "./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [school_service_1.SchoolService,
            area_service_1.AreaService,
            rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService])
    ], TransferParticipComponent);
    return TransferParticipComponent;
}());
exports.TransferParticipComponent = TransferParticipComponent;
//# sourceMappingURL=transfer-particip.component.js.map