"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicValidators = /** @class */ (function () {
    function BasicValidators() {
    }
    BasicValidators.email = function (control) {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    BasicValidators.emailOrEmpty = function (control) {
        var EMAIL_OR_EMPTY_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|^$/;
        return EMAIL_OR_EMPTY_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    BasicValidators.textMinLengthWithoutSpaces = function (minLen) {
        return function (control) {
            var text = control.value;
            return text.replace(/\s+/g, '').length < minLen ? { 'textMinLengthWithoutSpaces': { value: control.value } } : null;
        };
    };
    return BasicValidators;
}());
exports.BasicValidators = BasicValidators;
//# sourceMappingURL=basic-validators.js.map