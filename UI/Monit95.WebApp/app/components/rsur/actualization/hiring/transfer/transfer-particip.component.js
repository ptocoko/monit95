"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var school_service_1 = require("../../../../../school.service");
var area_service_1 = require("../../../../../services/area.service");
var Subject_1 = require("rxjs/Subject");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var merge_1 = require("rxjs/observable/merge");
var switchMap_1 = require("rxjs/operators/switchMap");
var map_1 = require("rxjs/operators/map");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var TransferParticipComponent = /** @class */ (function () {
    function TransferParticipComponent(schoolService, areaService, rsurParticipService) {
        this.schoolService = schoolService;
        this.areaService = areaService;
        this.rsurParticipService = rsurParticipService;
        this.areas = [];
        this.schools = [];
        this.isLoading = false;
        this.selectionChange$ = new Subject_1.Subject();
    }
    TransferParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.areaService.getAll().subscribe(function (areas) { return _this.areas = areas; });
        var search$ = fromEvent_1.fromEvent(this.searchField.nativeElement, 'keyup')
            .pipe(debounceTime_1.debounceTime(1000));
        merge_1.merge(search$, this.selectionChange$)
            .pipe(switchMap_1.switchMap(function () {
            _this.isLoading = true;
            return _this.rsurParticipService.search(tslib_1.__assign({ ActualCode: 0 }, (_this.areaCode && { AreaCode: _this.areaCode }), (_this.schoolId && { SchoolId: _this.schoolId }), (_this.searchText && { Search: _this.searchText })));
        }), map_1.map(function (data) {
            _this.isLoading = false;
            //this.participsLength = data.TotalCount;
            //this.classes = data.Classes;
            return data;
        })).subscribe(function (particips) { return _this.particips = particips; });
    };
    //search() {
    //	this.searchChange$.next({});
    //}
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
    tslib_1.__decorate([
        core_1.ViewChild('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], TransferParticipComponent.prototype, "searchField", void 0);
    TransferParticipComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-transfer-particip',
            templateUrl: "./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/hiring/transfer/transfer-particip.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [school_service_1.SchoolService, area_service_1.AreaService, rsur_particip_service_1.RsurParticipService])
    ], TransferParticipComponent);
    return TransferParticipComponent;
}());
exports.TransferParticipComponent = TransferParticipComponent;
//# sourceMappingURL=transfer-particip.component.js.map