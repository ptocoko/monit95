var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var HireComponent = /** @class */ (function () {
    function HireComponent() {
        this.isCreatingNew = 0;
    }
    HireComponent.prototype.conflictHandler = function (participFio) {
        this.isCreatingNew = 0;
        this.searchText = participFio;
    };
    HireComponent = __decorate([
        Component({
            templateUrl: './hire-particip.component.html',
            styleUrls: ['./hire-particip.component.css']
        })
    ], HireComponent);
    return HireComponent;
}());
export { HireComponent };
//# sourceMappingURL=hire-particip.component.js.map