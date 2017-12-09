"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var RsurProtocolFilter = /** @class */ (function () {
    function RsurProtocolFilter() {
    }
    RsurProtocolFilter.prototype.transform = function (array, searchText) {
        if (array && array.length > 1 && searchText) {
            return array.filter(function (f) { return f.ParticipCode.toString().indexOf(searchText) > -1; });
        }
        return array;
    };
    RsurProtocolFilter = tslib_1.__decorate([
        core_1.Pipe({
            name: 'rsurProtocolFilter',
            pure: false
        })
    ], RsurProtocolFilter);
    return RsurProtocolFilter;
}());
exports.RsurProtocolFilter = RsurProtocolFilter;
//# sourceMappingURL=rsur-protocol-filter.pipe.js.map