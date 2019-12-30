var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var RsurProtocolFilter = /** @class */ (function () {
    function RsurProtocolFilter() {
    }
    RsurProtocolFilter.prototype.transform = function (array, searchText) {
        if (array && array.length > 1 && searchText) {
            return array.filter(function (f) { return f.ParticipCode.toString().indexOf(searchText) > -1; });
        }
        return array;
    };
    RsurProtocolFilter = __decorate([
        Pipe({
            name: 'rsurProtocolFilter',
            pure: false
        })
    ], RsurProtocolFilter);
    return RsurProtocolFilter;
}());
export { RsurProtocolFilter };
//# sourceMappingURL=rsur-protocol-filter.pipe.js.map