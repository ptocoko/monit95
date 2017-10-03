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
var rsurparticip_service_1 = require("../rsurparticip.service");
var account_service_1 = require("../../account/account.service");
var school_collector_service_1 = require("../../shared/school-collector.service");
var COLLECTOR_ID = 1;
var RsurParticipsComponent = (function () {
    function RsurParticipsComponent(rsurParticipService, accountService, schoolCollectorService) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.schoolCollectorService = schoolCollectorService;
        this.particips = [];
    }
    RsurParticipsComponent.prototype.ngOnInit = function () {
        this.getAllParticips();
    };
    RsurParticipsComponent.prototype.getAllParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.json();
            _this.schoolCollectorService.getSchoolCollectorState(COLLECTOR_ID).subscribe(function (res) {
                console.log(res);
                _this.isFinished = res;
            });
        });
    };
    RsurParticipsComponent.prototype.setActualCode = function (particip, actualCode) {
        var _this = this;
        particip.ActualCode = actualCode;
        this.rsurParticipService.update(particip.Code, particip)
            .subscribe(function () {
            _this.getAllParticips();
        });
    };
    RsurParticipsComponent.prototype.delete = function (code) {
        var _this = this;
        this.rsurParticipService.delete(code).subscribe(function () {
            _this.getAllParticips();
        });
    };
    RsurParticipsComponent.prototype.onFinished = function () {
        var _this = this;
        var action = confirm('Вы уверены?');
        if (action) {
            this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(function () {
                _this.isFinished = true;
            });
        }
    };
    return RsurParticipsComponent;
}());
RsurParticipsComponent = __decorate([
    core_1.Component({
        selector: 'rsurparticips/get',
        templateUrl: "./app/rsur/rsur-particips/rsur-particips.component.html?v=" + new Date().getTime(),
        styleUrls: ['./app/rsur/rsur-particips/rsur-particips.component.css']
    }),
    __metadata("design:paramtypes", [rsurparticip_service_1.RsurParticipService,
        account_service_1.AccountService,
        school_collector_service_1.SchoolCollectorService])
], RsurParticipsComponent);
exports.RsurParticipsComponent = RsurParticipsComponent;
;
//# sourceMappingURL=rsur-particips.component.js.map