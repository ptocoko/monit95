"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SubjectFilterPipe = (function () {
    function SubjectFilterPipe() {
    }
    SubjectFilterPipe.prototype.transform = function (ratings, selectedSubject) {
        if (selectedSubject !== undefined) {
            ratings = ratings.filter(function (item) { return item.SubjectName === selectedSubject; });
        }
        return ratings;
    };
    return SubjectFilterPipe;
}());
SubjectFilterPipe = tslib_1.__decorate([
    core_1.Pipe({ name: 'subjectFilter' })
], SubjectFilterPipe);
exports.SubjectFilterPipe = SubjectFilterPipe;
//# sourceMappingURL=subject-filter.pipe.js.map