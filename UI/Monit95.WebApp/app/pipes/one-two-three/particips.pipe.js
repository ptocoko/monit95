"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ClassFilterPipe = /** @class */ (function () {
    function ClassFilterPipe() {
    }
    ClassFilterPipe.prototype.transform = function (particips, classId) {
        if (!classId || !particips)
            return particips;
        return particips.filter(function (particip) { return particip.ClassId === classId; });
    };
    ClassFilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'classFilter'
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
        return values
            .map(function (val) { return { Name: val.ClassName, Id: val.ClassId }; })
            .filter(function (value, index, self) {
            return self.map(function (mapSelf) { return mapSelf.Id; }).indexOf(value.Id) === index;
        });
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
        if (searchText == null)
            return particips;
        searchText = searchText.trim().toLowerCase();
        return particips.filter(function (particip) {
            return particip.Surname.trim().toLowerCase().indexOf(searchText) > -1
                || particip.Name.trim().toLowerCase().indexOf(searchText) > -1
                || particip.SecondName.trim().toLowerCase().indexOf(searchText) > -1;
        });
    };
    ParticipFilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'participFilter'
        })
    ], ParticipFilterPipe);
    return ParticipFilterPipe;
}());
exports.ParticipFilterPipe = ParticipFilterPipe;
//# sourceMappingURL=particips.pipe.js.map