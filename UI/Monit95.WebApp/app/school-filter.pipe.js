"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SchoolFilter = /** @class */ (function () {
    function SchoolFilter() {
    }
    SchoolFilter.prototype.transform = function (schools, areaCodeWithName) {
        if (schools == null)
            return schools;
        return schools.filter(function (school) { return school.AreaCodeWithName === areaCodeWithName; });
    };
    SchoolFilter = tslib_1.__decorate([
        core_1.Pipe({ name: 'schoolFilter' })
    ], SchoolFilter);
    return SchoolFilter;
}());
exports.SchoolFilter = SchoolFilter;
//# sourceMappingURL=school-filter.pipe.js.map