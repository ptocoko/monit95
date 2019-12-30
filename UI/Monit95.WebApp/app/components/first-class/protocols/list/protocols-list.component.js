var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { Router } from '@angular/router';
import { Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, startWith, switchMap, map } from 'rxjs/operators';
import { TablePaginator } from '../../../../shared/table-paginator/table-paginator';
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
        this.selectionChange$ = new Subject();
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
        var search$ = fromEvent(this.participFioInput.nativeElement, 'input')
            .pipe(debounceTime(1000));
        search$.subscribe(function () { return _this.pageIndex = 0; });
        merge(this.paginator.page, search$, this.selectionChange$)
            .pipe(startWith({}), switchMap(function () {
            _this.protocols = [];
            _this.isLoading = true;
            return _this.createRequest();
        }), map(function (data) {
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
    __decorate([
        ViewChild('participFioInput'),
        __metadata("design:type", ElementRef)
    ], ProtocolsListComponent.prototype, "participFioInput", void 0);
    __decorate([
        ViewChild(TablePaginator),
        __metadata("design:type", TablePaginator)
    ], ProtocolsListComponent.prototype, "paginator", void 0);
    ProtocolsListComponent = __decorate([
        Component({
            templateUrl: './protocols-list.component.html',
            styleUrls: ['./protocols-list.component.css']
        }),
        __metadata("design:paramtypes", [ProtocolsService,
            Renderer2,
            Router])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
export { ProtocolsListComponent };
//# sourceMappingURL=protocols-list.component.js.map