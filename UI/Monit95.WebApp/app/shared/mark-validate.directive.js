"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkValidateDirective = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MarkValidateDirective = /** @class */ (function () {
    function MarkValidateDirective() {
    }
    MarkValidateDirective_1 = MarkValidateDirective;
    MarkValidateDirective.prototype.validate = function (control) {
        return this.question && control.value ? markValidator(this.question)(control) : null;
    };
    var MarkValidateDirective_1;
    tslib_1.__decorate([
        (0, core_1.Input)('appMark'),
        tslib_1.__metadata("design:type", Object)
    ], MarkValidateDirective.prototype, "question", void 0);
    MarkValidateDirective = MarkValidateDirective_1 = tslib_1.__decorate([
        (0, core_1.Directive)({
            selector: '[appMark]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MarkValidateDirective_1, multi: true }]
        })
    ], MarkValidateDirective);
    return MarkValidateDirective;
}());
exports.MarkValidateDirective = MarkValidateDirective;
function getPossibleMarks(maxMark, step) {
    var resArr = [];
    for (var i = 0; i <= maxMark; i += step) {
        resArr.push(i);
    }
    return resArr;
}
function markValidator(question) {
    return function (control) {
        var possibleMarks = getPossibleMarks(question.MaxMark, question.Step);
        return possibleMarks.indexOf(question.CurrentMark) > -1 ? null :
            {
                'markValidate': {
                    value: "\u041E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0435 \"".concat(question.Name, "\" \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 \u043E\u0442 \u00AB0\u00BB \u0434\u043E \u00AB").concat(question.MaxMark, "\u00BB")
                }
            };
    };
}
//# sourceMappingURL=mark-validate.directive.js.map