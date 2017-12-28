"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var material_1 = require("@angular/material");
var RussianMatPaginator = /** @class */ (function (_super) {
    tslib_1.__extends(RussianMatPaginator, _super);
    function RussianMatPaginator() {
        var _this = _super.call(this) || this;
        _this.nextPageLabel = ' следующая страница';
        _this.previousPageLabel = ' предыдущая страница';
        _this.itemsPerPageLabel = 'кол-во на странице: ';
        _this.getRangeLabel = function (page, pageSize, length) {
            if (length == 0 || pageSize == 0) {
                return "0 \u0438\u0437 " + length;
            }
            length = Math.max(length, 0);
            var startIndex = page * pageSize;
            var endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return startIndex + 1 + " - " + endIndex + " \u0438\u0437 " + length;
        };
        return _this;
    }
    return RussianMatPaginator;
}(material_1.MatPaginatorIntl));
exports.RussianMatPaginator = RussianMatPaginator;
//# sourceMappingURL=russian-paginator.provider.js.map