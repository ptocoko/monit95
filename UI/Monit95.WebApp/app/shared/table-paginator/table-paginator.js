"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablePaginator = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var TablePaginator = /** @class */ (function () {
    function TablePaginator() {
        this.pageIndexChange = new core_1.EventEmitter();
        this.pageSizeOptions = [30, 60, 100];
        this.pageSize = 30;
        this.pageSizeChange = new core_1.EventEmitter();
        this.change$ = new Subject_1.Subject();
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
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Number)
    ], TablePaginator.prototype, "pageIndex", void 0);
    tslib_1.__decorate([
        (0, core_1.Output)(),
        tslib_1.__metadata("design:type", Object)
    ], TablePaginator.prototype, "pageIndexChange", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Number)
    ], TablePaginator.prototype, "length", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Array)
    ], TablePaginator.prototype, "pageSizeOptions", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Number)
    ], TablePaginator.prototype, "pageSize", void 0);
    tslib_1.__decorate([
        (0, core_1.Output)(),
        tslib_1.__metadata("design:type", Object)
    ], TablePaginator.prototype, "pageSizeChange", void 0);
    TablePaginator = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'app-table-paginator',
            templateUrl: "./app/shared/table-paginator/table-paginator.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/shared/table-paginator/table-paginator.css?v=".concat(new Date().getTime())]
        })
    ], TablePaginator);
    return TablePaginator;
}());
exports.TablePaginator = TablePaginator;
//# sourceMappingURL=table-paginator.js.map