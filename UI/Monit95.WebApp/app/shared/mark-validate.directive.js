var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var MarkValidateDirective = /** @class */ (function () {
    function MarkValidateDirective() {
    }
    MarkValidateDirective_1 = MarkValidateDirective;
    MarkValidateDirective.prototype.validate = function (control) {
        return this.question && control.value ? markValidator(this.question)(control) : null;
    };
    var MarkValidateDirective_1;
    __decorate([
        Input('appMark'),
        __metadata("design:type", Object)
    ], MarkValidateDirective.prototype, "question", void 0);
    MarkValidateDirective = MarkValidateDirective_1 = __decorate([
        Directive({
            selector: '[appMark]',
            providers: [{ provide: NG_VALIDATORS, useExisting: MarkValidateDirective_1, multi: true }]
        })
    ], MarkValidateDirective);
    return MarkValidateDirective;
}());
export { MarkValidateDirective };
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
                    value: "\u041E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0435 \"" + question.Name + "\" \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 (" + possibleMarks.reduce(function (acc, mark) { return acc += '«' + mark + '» '; }, '').slice(0, -1) + ")"
                }
            };
    };
}
//# sourceMappingURL=mark-validate.directive.js.map