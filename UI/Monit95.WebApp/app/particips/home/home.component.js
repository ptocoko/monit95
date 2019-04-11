"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../services/account.service");
var cards_service_1 = require("../../services/cards.service");
var functions_1 = require("../../utils/functions");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(account, cards) {
        this.account = account;
        this.cards = cards;
        this.date = new Date();
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.downloadCards = function (projectId) {
        this.cards.getForSchool(projectId).subscribe(function (cards) {
            var url = window.URL.createObjectURL(cards);
            functions_1.downloadFile(url, 'результаты.zip');
        });
    };
    HomeComponent.prototype.setTimer = function (day, hours) {
        if (hours === void 0) { hours = 12; }
        return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService, cards_service_1.CardsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map