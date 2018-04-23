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
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, classService) {
        this.participService = participService;
        this.classService = classService;
        this.particips = [];
        this.classes = [];
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.participsLength = 0;
        this.selectionChange$ = new Subject_1.Subject();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        var search$ = fromEvent_1.fromEvent(this.searchField.nativeElement, 'input')
            .pipe(debounceTime_1.debounceTime(1000));
        search$.subscribe(function () { return _this.pageIndex = 0; });
        merge_1.merge(this.paginator.page, search$, this.selectionChange$)
            .pipe(startWith_1.startWith({}), switchMap_1.switchMap(function () {
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
        this.participService.deleteParticip(participId).subscribe(function () {
            _this.particips.splice(participIndex, 1);
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
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService, class_service_1.ClassService])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map