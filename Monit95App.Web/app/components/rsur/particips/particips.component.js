"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var account_1 = require("../../shared/account");
// Services
var rsurparticip_service_1 = require("../rsurparticip.service");
var account_service_1 = require("../../services/account.service");
var RsurParticipsComponent = (function () {
    function RsurParticipsComponent(rsurParticipService, accountService) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.particips = [];
        this.account = new account_1.Account();
    }
    RsurParticipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllParticips();
        this.accountService.getAccount().subscribe(function (data) {
            _this.account = data.json();
        });
    };
    RsurParticipsComponent.prototype.getAllParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.json();
        });
    };
    RsurParticipsComponent.prototype.isArea = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
    };
    return RsurParticipsComponent;
}());
RsurParticipsComponent = __decorate([
    core_1.Component({
        selector: 'rsur/particips',
        templateUrl: "./app/rsur/rsur-particips/rsur-particips.component.html?v=" + new Date().getTime(),
        styleUrls: ['./app/rsur/rsur-particips/rsur-particips.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof rsurparticip_service_1.RsurParticipService !== "undefined" && rsurparticip_service_1.RsurParticipService) === "function" && _a || Object, typeof (_b = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" && _b || Object])
], RsurParticipsComponent);
exports.RsurParticipsComponent = RsurParticipsComponent;
;
var _a, _b;
//# sourceMappingURL=particips.component.js.map