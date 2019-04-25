"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ClassFilterPipe = /** @class */ (function () {
    function ClassFilterPipe() {
    }
    ClassFilterPipe.prototype.transform = function (particips, classId) {
        if (!classId || !particips || particips.length === 0)
            return particips;
        return particips.filter(function (particip) { return particip.ClassId === classId; });
    };
    ClassFilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'classFilter',
            pure: true
        })
    ], ClassFilterPipe);
    return ClassFilterPipe;
}());
exports.ClassFilterPipe = ClassFilterPipe;
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
    ClassesGetterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'getClasses',
            pure: true
        })
    ], ClassesGetterPipe);
    return ClassesGetterPipe;
}());
exports.ClassesGetterPipe = ClassesGetterPipe;
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
    ParticipFilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'participFilter',
            pure: true
        })
    ], ParticipFilterPipe);
    return ParticipFilterPipe;
}());
exports.ParticipFilterPipe = ParticipFilterPipe;
//# sourceMappingURL=particips.pipe.js.map