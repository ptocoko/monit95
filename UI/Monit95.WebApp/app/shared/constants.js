"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constant = /** @class */ (function () {
    function Constant() {
    }
    Constant.PROJECT_ID = 12;
    Constant.questionResultsSortFunc = function (a, b) {
        if (a.Order < b.Order)
            return -1;
        else if (a.Order > b.Order)
            return 1;
        else
            return 0;
    };
    return Constant;
}());
exports.Constant = Constant;
//# sourceMappingURL=constants.js.map