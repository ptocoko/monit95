var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService) {
        this.accountService = accountService;
        this.timeIsCome = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = (date.getDate() === 21 && date.getHours() >= 7 && date.getMinutes() >= 30) || date.getDate() > 21;
    };
    HomeComponent = __decorate([
        Component({
            templateUrl: './home.component.html',
        }),
        __metadata("design:paramtypes", [AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map