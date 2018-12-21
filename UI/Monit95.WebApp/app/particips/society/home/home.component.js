"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var cards_service_1 = require("../../../services/cards.service");
var functions_1 = require("../../../utils/functions");
var SocietyHomeComponent = /** @class */ (function () {
    function SocietyHomeComponent(account, cards) {
        this.account = account;
        this.cards = cards;
        this.timeIsCome = false;
    }
    SocietyHomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = this.account.account.UserName === '0000' ? true : (date.getDate() === 21 && date.getHours() >= 8) || date.getDate() > 21;
    };
    SocietyHomeComponent.prototype.downloadProtocol = function () {
        this.cards.getForSchool(20).subscribe(function (cards) {
            var url = window.URL.createObjectURL(cards);
            functions_1.downloadFile(url, 'протокол «Я сдам Обществознание!».zip');
        });
    };
    SocietyHomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/society/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService, cards_service_1.CardsService])
    ], SocietyHomeComponent);
    return SocietyHomeComponent;
}());
exports.SocietyHomeComponent = SocietyHomeComponent;
//# sourceMappingURL=home.component.js.map