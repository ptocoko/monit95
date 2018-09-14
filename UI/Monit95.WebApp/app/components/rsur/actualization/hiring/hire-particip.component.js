"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        core_1.Component({
            templateUrl: "./app/components/rsur/actualization/hiring/hire-particip.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/hiring/hire-particip.component.css?v=" + new Date().getTime()]
        })
    ], HireComponent);
    return HireComponent;
}());
exports.HireComponent = HireComponent;
//# sourceMappingURL=hire-particip.component.js.map