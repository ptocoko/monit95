"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicValidators = (function () {
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
    return BasicValidators;
}());
exports.BasicValidators = BasicValidators;
//# sourceMappingURL=basic-validators.js.map