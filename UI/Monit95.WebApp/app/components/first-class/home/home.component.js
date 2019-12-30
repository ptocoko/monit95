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
import { removeFromLocalStorage } from '../../../utils/local-storage';
import { CardsService } from '../../../services/cards.service';
var PROJECT_TEST_ID = 3078;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService, cardsService) {
        this.accountService = accountService;
        this.cardsService = cardsService;
        this.timeIsCome = false;
        this.cardsIdGenerating = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        //const date = new Date();
        //this.timeIsCome = (date.getDate() === 17 && date.getHours() >= 8) || date.getDate() > 17;
        removeFromLocalStorage('FIRST_CLASS_ID');
    };
    HomeComponent.prototype.downloadCards = function () {
        var _this = this;
        this.cardsIdGenerating = true;
        this.cardsService.getForSchool(PROJECT_TEST_ID).subscribe(function (cards) {
            var url = window.URL.createObjectURL(cards);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = '1-е классы карты.zip';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            _this.cardsIdGenerating = false;
        }, function (error) {
            _this.cardsIdGenerating = false;
            if (error.status === 404) {
                alert('Карты не найдены. Если Вы уверены что загружали результаты участников, пожалуйста, обратитесть к администратору');
            }
            else {
                throw error;
            }
        });
    };
    HomeComponent = __decorate([
        Component({
            templateUrl: './home.component.html',
        }),
        __metadata("design:paramtypes", [AccountService,
            CardsService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map