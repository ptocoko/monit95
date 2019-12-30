var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ClassFilterPipe = /** @class */ (function () {
    function ClassFilterPipe() {
    }
    ClassFilterPipe.prototype.transform = function (particips, classId) {
        if (!classId || !particips || particips.length === 0)
            return particips;
        return particips.filter(function (particip) { return particip.ClassId === classId; });
    };
    ClassFilterPipe = __decorate([
        Pipe({
            name: 'classFilter',
            pure: true
        })
    ], ClassFilterPipe);
    return ClassFilterPipe;
}());
export { ClassFilterPipe };
var ClassesGetterPipe = /** @class */ (function () {
    function ClassesGetterPipe() {
    }
    ClassesGetterPipe.prototype.transform = function (values) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!values || values.length === 0)
            return values;
        return values
            .map(function (val) { return { Name: val.ClassName, Id: val.ClassId }; })
            .filter(function (value, index, self) {
            return self.map(function (mapSelf) { return mapSelf.Id; }).indexOf(value.Id) === index;
        })
            .sort(function (a, b) { return a.Id - b.Id; });
    };
    ClassesGetterPipe = __decorate([
        Pipe({
            name: 'getClasses',
            pure: true
        })
    ], ClassesGetterPipe);
    return ClassesGetterPipe;
}());
export { ClassesGetterPipe };
var ParticipFilterPipe = /** @class */ (function () {
    function ParticipFilterPipe() {
    }
    ParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (!searchText || !particips || particips.length === 0)
            return particips;
        searchText = searchText.trim().toLowerCase();
        return particips.filter(function (particip) {
            if (particip.ParticipFIO) {
                return particip.ParticipFIO.trim().toLowerCase().indexOf(searchText) > -1;
            }
            else {
                return particip.Surname.trim().toLowerCase().indexOf(searchText) > -1
                    || particip.Name.trim().toLowerCase().indexOf(searchText) > -1;
            }
        });
    };
    ParticipFilterPipe = __decorate([
        Pipe({
            name: 'participFilter',
            pure: true
        })
    ], ParticipFilterPipe);
    return ParticipFilterPipe;
}());
export { ParticipFilterPipe };
//# sourceMappingURL=particips.pipe.js.map