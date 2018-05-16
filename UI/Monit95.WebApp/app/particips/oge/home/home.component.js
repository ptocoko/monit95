"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var OgeHomeComponent = /** @class */ (function () {
    function OgeHomeComponent() {
        this.timeIsCome = false;
    }
    OgeHomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = (date.getDate() === 16 && date.getHours() >= 8) || date.getDate() > 16;
    };
    OgeHomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/oge/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], OgeHomeComponent);
    return OgeHomeComponent;
}());
exports.OgeHomeComponent = OgeHomeComponent;
//# sourceMappingURL=home.component.js.map