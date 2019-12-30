var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
var TablePaginator = /** @class */ (function () {
    function TablePaginator() {
        this.pageIndexChange = new EventEmitter();
        this.pageSizeOptions = [30, 60, 100];
        this.pageSize = 30;
        this.pageSizeChange = new EventEmitter();
        this.change$ = new Subject();
        this.page = this.change$.asObservable();
    }
    TablePaginator.prototype.ngDoCheck = function () {
        this.maxPageIndex = Math.floor(this.length / this.pageSize);
    };
    TablePaginator.prototype.toPrev = function () {
        if (this.pageIndex >= 1) {
            this.pageIndexChange.emit(--this.pageIndex);
            this.change$.next({});
        }
    };
    TablePaginator.prototype.toNext = function () {
        if (this.pageIndex < this.maxPageIndex) {
            this.pageIndexChange.emit(++this.pageIndex);
            this.change$.next({});
        }
    };
    TablePaginator.prototype.sizeChange = function () {
        this.pageSizeChange.emit(this.pageSize);
        this.pageIndex = 0;
        this.pageIndexChange.emit(this.pageIndex);
        this.change$.next({});
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TablePaginator.prototype, "pageIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TablePaginator.prototype, "pageIndexChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TablePaginator.prototype, "length", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TablePaginator.prototype, "pageSizeOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TablePaginator.prototype, "pageSize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TablePaginator.prototype, "pageSizeChange", void 0);
    TablePaginator = __decorate([
        Component({
            selector: 'app-table-paginator',
            templateUrl: "./table-paginator.html",
            styleUrls: ["./table-paginator.css"]
        })
    ], TablePaginator);
    return TablePaginator;
}());
export { TablePaginator };
//# sourceMappingURL=table-paginator.js.map