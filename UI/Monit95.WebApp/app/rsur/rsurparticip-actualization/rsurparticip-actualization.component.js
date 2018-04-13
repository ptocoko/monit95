"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_particip_service_1 = require("../../services/rsur-particip.service");
var account_service_1 = require("../../services/account.service");
var school_collector_service_1 = require("../../shared/school-collector.service");
var COLLECTOR_ID = 1;
var RsurParticipsActualizationComponent = /** @class */ (function () {
    function RsurParticipsActualizationComponent(rsurParticipService, accountService, schoolCollectorService) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.schoolCollectorService = schoolCollectorService;
        this.particips = [];
    }
    RsurParticipsActualizationComponent.prototype.ngOnInit = function () {
        this.getAllParticips();
    };
    RsurParticipsActualizationComponent.prototype.getAllParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response;
            _this.schoolCollectorService.getSchoolCollectorState(COLLECTOR_ID).subscribe(function (res) {
                console.log(res);
                _this.isFinished = res;
            });
        });
    };
    RsurParticipsActualizationComponent.prototype.setActualCode = function (particip, actualCode) {
        var _this = this;
        particip.ActualCode = actualCode;
        this.rsurParticipService.update(particip.Code, particip)
            .subscribe(function () {
            _this.getAllParticips();
        });
    };
    RsurParticipsActualizationComponent.prototype.delete = function (code) {
        var _this = this;
        this.rsurParticipService.delete(code).subscribe(function () {
            _this.getAllParticips();
        });
    };
    RsurParticipsActualizationComponent.prototype.onFinished = function () {
        var _this = this;
        var action = confirm('Вы уверены?');
        if (action) {
            this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(function () {
                _this.isFinished = true;
            });
        }
    };
    RsurParticipsActualizationComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rsur/particips',
            templateUrl: "./app/rsur/rsur-particips/rsur-particips.component.html?v=" + new Date().getTime(),
            styleUrls: ['./app/rsur/rsur-particips/rsur-particips.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService,
            school_collector_service_1.SchoolCollectorService])
    ], RsurParticipsActualizationComponent);
    return RsurParticipsActualizationComponent;
}());
exports.RsurParticipsActualizationComponent = RsurParticipsActualizationComponent;
;
//# sourceMappingURL=rsurparticip-actualization.component.js.map