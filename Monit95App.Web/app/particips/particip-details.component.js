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
var particip_service_1 = require("./particip.service");
var user_service_1 = require("../user.service");
var ParticipDetailsComponent = (function () {
    function ParticipDetailsComponent(participService, userService) {
        this.participService = participService;
        this.userService = userService;
    }
    ParticipDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getName().subscribe(function (response) {
            var result = response.json();
            _this.userName = result.UserName;
            _this.isAreaRole = result.IsAreaRole;
            _this.getByAreaCode();
        });
    };
    //Get by areaCode
    ParticipDetailsComponent.prototype.getByAreaCode = function () {
        var _this = this;
        this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(function (particips) { return _this.particips = particips; });
    };
    return ParticipDetailsComponent;
}());
ParticipDetailsComponent = __decorate([
    core_1.Component({
        selector: 'particip-details',
        templateUrl: './app/particips/particip-details.component.html',
        providers: [particip_service_1.ParticipService, user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService, user_service_1.UserService])
], ParticipDetailsComponent);
exports.ParticipDetailsComponent = ParticipDetailsComponent;
//# sourceMappingURL=particip-details.component.js.map