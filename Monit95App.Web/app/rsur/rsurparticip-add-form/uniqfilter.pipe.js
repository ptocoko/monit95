"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
UniqFilter = __decorate([
    core_1.Pipe({
        name: 'uniqFilter',
        pure: false
    }),
    core_2.Injectable()
], UniqFilter);
exports.UniqFilter = UniqFilter;
//# sourceMappingURL=uniqfilter.pipe.js.map