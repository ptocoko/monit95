var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ClassNameFilterPipe = /** @class */ (function () {
    function ClassNameFilterPipe() {
    }
    ClassNameFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText === 'Все классы' || searchText == null)
            return particips;
        return particips.filter(function (particip) { return particip.ClassName.trim() == searchText; });
    };
    ClassNameFilterPipe = __decorate([
        Pipe({ name: 'classNameFilter' })
    ], ClassNameFilterPipe);
    return ClassNameFilterPipe;
}());
export { ClassNameFilterPipe };
//# sourceMappingURL=class-name-filter.pipe.js.map