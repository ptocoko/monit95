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
            templateUrl: './hire-particip.component.html',
            styleUrls: ['./hire-particip.component.css']
        })
    ], HireComponent);
    return HireComponent;
}());
exports.HireComponent = HireComponent;
//# sourceMappingURL=hire-particip.component.js.map