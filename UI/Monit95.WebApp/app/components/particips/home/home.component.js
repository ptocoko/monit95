"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var school_service_1 = require("../../../school.service");
var account_service_1 = require("../../../services/account.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(route, account, schoolService) {
        this.route = route;
        this.account = account;
        this.schoolService = schoolService;
        this.date = new Date();
        this.CHG_schools = ['0319', '0149', '0152'];
        this.MG_schools = ['0051', '0147', '0053'];
        this.EST_schools = ['0277', '0278'];
        this.GK_schools = ['0135', '0015'];
        this.FG_schools = ['0141', '0142'];
        this.KM_schools = ['0463', '0465'];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.projectId = +queryParams.get('projectId');
            _this.projectName = queryParams.get('projectName');
            if (_this.projectName && _this.projectId && !isNaN(_this.projectId)) {
            }
            if (_this.projectId === 39) {
                _this.projectName = 'Функциональная грамотность';
            }
        });
        //const authSub = this.account.auth.subscribe(auth => {
        //    if (auth) {
        //        this.schoolService.getInfo(auth.UserName).subscribe(info => {
        //            this.currentAreaCode = info.AreaCode;
        //            authSub.unsubscribe();
        //        });
        //    }
        //});
    };
    HomeComponent.prototype.setTimer = function (day, hours, minutes) {
        if (hours === void 0) { hours = 12; }
        if (minutes === void 0) { minutes = 0; }
        return (this.date.getDate() === day && ((this.date.getHours() === hours && this.date.getMinutes() >= minutes) || this.date.getHours() > hours)) || this.date.getDate() > day;
    };
    HomeComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/particips/home/home.component.html?v=".concat(new Date().getTime())
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute, account_service_1.AccountService, school_service_1.SchoolService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map