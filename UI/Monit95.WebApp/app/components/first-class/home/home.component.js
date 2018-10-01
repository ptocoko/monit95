"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var local_storage_1 = require("../../../utils/local-storage");
var cards_service_1 = require("../../../services/cards.service");
var PROJECT_TEST_ID = 2043;
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
        local_storage_1.removeFromLocalStorage('FIRST_CLASS_ID');
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
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService,
            cards_service_1.CardsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map