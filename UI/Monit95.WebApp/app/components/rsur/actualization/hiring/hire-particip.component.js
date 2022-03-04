"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var HireComponent = /** @class */ (function () {
    function HireComponent() {
        this.isCreatingNew = 0;
    }
    HireComponent.prototype.conflictHandler = function (participFio) {
        this.isCreatingNew = 0;
        this.searchText = participFio;
    };
    HireComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/rsur/actualization/hiring/hire-particip.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/actualization/hiring/hire-particip.component.css?v=".concat(new Date().getTime())]
        })
    ], HireComponent);
    return HireComponent;
}());
exports.HireComponent = HireComponent;
//# sourceMappingURL=hire-particip.component.js.map