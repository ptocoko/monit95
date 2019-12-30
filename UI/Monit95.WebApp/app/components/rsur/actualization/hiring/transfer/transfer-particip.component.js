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
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { SchoolService } from '../../../../../school.service';
import { AreaService } from '../../../../../services/area.service';
import { Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, startWith, switchMap, map } from 'rxjs/operators';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { TablePaginator } from '../../../../../shared/table-paginator/table-paginator';
import { AccountService } from '../../../../../services/account.service';
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
        this.selectionChange$ = new Subject();
    }
    TransferParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.areaService.getAll().subscribe(function (areas) { return _this.areas = areas; });
        var search$ = fromEvent(this.searchField.nativeElement, 'keyup')
            .pipe(debounceTime(1000));
        this.paginator.page.subscribe(function () { return window.scrollTo(0, 0); });
        merge(search$, this.selectionChange$, this.paginator.page)
            .pipe(startWith({}), switchMap(function () {
            _this.isLoading = true;
            return _this.rsurParticipService.search(__assign({ ActualCodes: [0, 2], Page: _this.pageIndex + 1, PageSize: _this.pageSize }, (_this.areaCode && { AreaCode: _this.areaCode }), (_this.schoolId && { SchoolId: _this.schoolId }), (_this.searchText && { Search: _this.searchText })));
        }), map(function (data) {
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TransferParticipComponent.prototype, "searchText", void 0);
    __decorate([
        ViewChild('searchField'),
        __metadata("design:type", ElementRef)
    ], TransferParticipComponent.prototype, "searchField", void 0);
    __decorate([
        ViewChild(TablePaginator),
        __metadata("design:type", TablePaginator)
    ], TransferParticipComponent.prototype, "paginator", void 0);
    TransferParticipComponent = __decorate([
        Component({
            selector: 'app-transfer-particip',
            templateUrl: './transfer-particip.component.html',
            styleUrls: ['./transfer-particip.component.css']
        }),
        __metadata("design:paramtypes", [SchoolService,
            AreaService,
            RsurParticipService,
            AccountService])
    ], TransferParticipComponent);
    return TransferParticipComponent;
}());
export { TransferParticipComponent };
//# sourceMappingURL=transfer-particip.component.js.map