"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var UniqFilter = (function () {
    function UniqFilter() {
    }
    UniqFilter.prototype.transform = function (items, filter) {
        //if (!items || !filter) {
        //    return items;
        //}
        //var r: any;
        //r.filter(
        //// filter items array, items which match and return true will be kept, false will be filtered out
        //return items.filter(item => item.AreaCodeWithName.indexOf(filter.Area) !== -1);
    };
    return UniqFilter;
}());
UniqFilter = tslib_1.__decorate([
    core_1.Pipe({
        name: 'uniqFilter',
        pure: false
    }),
    core_2.Injectable()
], UniqFilter);
exports.UniqFilter = UniqFilter;
//# sourceMappingURL=uniqfilter.pipe.js.map