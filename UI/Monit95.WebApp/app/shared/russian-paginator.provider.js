var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { MatPaginatorIntl } from '@angular/material';
var RussianMatPaginator = /** @class */ (function (_super) {
    __extends(RussianMatPaginator, _super);
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
}(MatPaginatorIntl));
export { RussianMatPaginator };
//# sourceMappingURL=russian-paginator.provider.js.map