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
import { AccountService } from '../../../services/account.service';
import { CardsService } from '../../../services/cards.service';
import { downloadFile } from '../../../utils/functions';
var SocietyHomeComponent = /** @class */ (function () {
    function SocietyHomeComponent(account, cards) {
        this.account = account;
        this.cards = cards;
        this.timeIsCome = false;
    }
    SocietyHomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = this.account.account.UserName === '0000' ? true : (date.getDate() === 22 && date.getHours() >= 8) || date.getDate() > 22;
    };
    SocietyHomeComponent.prototype.downloadProtocol = function () {
        this.cards.getForSchool(20).subscribe(function (cards) {
            var url = window.URL.createObjectURL(cards);
            downloadFile(url, 'протокол «Я сдам Обществознание!».zip');
        });
    };
    SocietyHomeComponent = __decorate([
        Component({
            templateUrl: './home.component.html',
        }),
        __metadata("design:paramtypes", [AccountService, CardsService])
    ], SocietyHomeComponent);
    return SocietyHomeComponent;
}());
export { SocietyHomeComponent };
//# sourceMappingURL=home.component.js.map