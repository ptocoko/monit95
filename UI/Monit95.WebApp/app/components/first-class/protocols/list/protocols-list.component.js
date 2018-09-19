"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var protocols_service_1 = require("../../../../services/first-class/protocols.service");
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var merge_1 = require("rxjs/observable/merge");
var startWith_1 = require("rxjs/operators/startWith");
var switchMap_1 = require("rxjs/operators/switchMap");
var map_1 = require("rxjs/operators/map");
var table_paginator_1 = require("../../../../shared/table-paginator/table-paginator");
var ProtocolsListComponent = /** @class */ (function () {
    function ProtocolsListComponent(protocolsService, renderer, router) {
        var _this = this;
        this.protocolsService = protocolsService;
        this.renderer = renderer;
        this.router = router;
        this.protocols = [];
        this.processedProtocols = 0; //= () => this.protocols.filter(f => f.Marks).length;
        this.notProcessedProtocols = 0; //() => this.protocols.filter(f => !f.Marks).length;
        this.classes = [];
        this.AbsentText = 'отсутствовал';
        this.isLoading = true;
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.protocolsLength = 0;
        this.selectionChange$ = new Subject_1.Subject();
        this.focusOnFioField = function () { return _this.renderer.selectRootElement(_this.participFioInput.nativeElement).focus(); };
    }
    ProtocolsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        //this.protocolsService.getAll().subscribe(protocols => {
        //	this.protocols = protocols;
        //	this.isLoading = false;
        //	this.focusOnFioField();
        //});
        var search$ = fromEvent_1.fromEvent(this.participFioInput.nativeElement, 'input')
            .pipe(debounceTime_1.debounceTime(1000));
        search$.subscribe(function () { return _this.pageIndex = 0; });
        merge_1.merge(this.paginator.page, search$, this.selectionChange$)
            .pipe(startWith_1.startWith({}), switchMap_1.switchMap(function () {
            _this.protocols = [];
            _this.isLoading = true;
            return _this.createRequest();
        }), map_1.map(function (data) {
            _this.isLoading = false;
            _this.protocolsLength = data.TotalCount;
            _this.classes = data.Classes;
            _this.processedProtocols = data.ProcessedItemsCount;
            _this.notProcessedProtocols = data.NotProcessedItemsCount;
            return data.Items;
        })).subscribe(function (protocols) { return _this.protocols = protocols; });
    };
    ProtocolsListComponent.prototype.createRequest = function () {
        return this.protocolsService.getAll({
            page: this.pageIndex + 1,
            length: this.limitToVal,
            search: this.searchText,
            classId: this.searchClass
        });
    };
    ProtocolsListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/first-class/protocol', participTestId]);
    };
    ProtocolsListComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        this.protocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            protocol.Marks = _this.AbsentText;
        });
    };
    ProtocolsListComponent.prototype.selectionChange = function () {
        this.pageIndex = 0;
        this.selectionChange$.next({});
    };
    tslib_1.__decorate([
        core_1.ViewChild('participFioInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ProtocolsListComponent.prototype, "participFioInput", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(table_paginator_1.TablePaginator),
        tslib_1.__metadata("design:type", table_paginator_1.TablePaginator)
    ], ProtocolsListComponent.prototype, "paginator", void 0);
    ProtocolsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/protocols/list/protocols-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/first-class/protocols/list/protocols-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [protocols_service_1.ProtocolsService,
            core_1.Renderer2,
            router_1.Router])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
exports.ProtocolsListComponent = ProtocolsListComponent;
//# sourceMappingURL=protocols-list.component.js.map