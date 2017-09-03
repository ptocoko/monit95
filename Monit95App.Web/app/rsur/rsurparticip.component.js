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
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var rsurparticip_service_1 = require("./rsurparticip.service");
var account_service_1 = require("../account.service");
var RsurParticipComponent = (function () {
    function RsurParticipComponent(rsurParticipService, accountService, modal) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.modal = modal;
        this.particips = [];
    }
    RsurParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get participList
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.json();
        });
        //this.particips = PARTICIPS;// as ParticipModel[];
        //Get user name
        this.accountService.getAccount().subscribe(function (response) {
            _this.userName = response.json().UserName;
        });
    };
    return RsurParticipComponent;
}());
RsurParticipComponent = __decorate([
    core_1.Component({
        selector: 'particip-list',
        templateUrl: './app/rsur/particip-list.component.html?v=${new Date().getTime()}',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [rsurparticip_service_1.RsurParticipService,
        account_service_1.AccountService,
        bootstrap_1.Modal])
], RsurParticipComponent);
exports.RsurParticipComponent = RsurParticipComponent;
;
//# sourceMappingURL=rsurparticip.component.js.map