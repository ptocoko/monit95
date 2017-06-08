"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultsModel = (function () {
    function ResultsModel(resultDetails) {
        this.resultDetails = resultDetails;
    }
    return ResultsModel;
}());
exports.ResultsModel = ResultsModel;
var ResultDetailsModel = (function () {
    function ResultDetailsModel(subjectName, testDate, marks, grade5, testId) {
        this.subjectName = subjectName;
        this.testDate = testDate;
        this.marks = marks;
        this.grade5 = grade5;
        this.testId = testId;
    }
    return ResultDetailsModel;
}());
exports.ResultDetailsModel = ResultDetailsModel;
//# sourceMappingURL=results.model.js.map