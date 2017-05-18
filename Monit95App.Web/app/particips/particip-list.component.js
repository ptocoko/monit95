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
var ParticipListComponent = (function () {
    function ParticipListComponent(participService, userService) {
        this.participService = participService;
        this.userService = userService;
        this.particips = [];
    }
    ParticipListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getName().subscribe(function (response) {
            _this.areaCode = response.json();
            _this.getByAreaCode();
            _this.participListDocPath =
                'https://cloud.mail.ru/public/GhWx/bn9GnxmXg/' + _this.areaCode + '/' + _this.areaCode + '_список.xlsx';
        });
    };
    //Get by areaCode
    ParticipListComponent.prototype.getByAreaCode = function () {
        var _this = this;
        this.participService.getByAreaCode(this.areaCode).subscribe(function (particips) { return _this.particips = particips; });
    };
    return ParticipListComponent;
}());
ParticipListComponent = __decorate([
    core_1.Component({
        selector: 'particip-list',
        templateUrl: './app/particips/particip-list.html',
        providers: [particip_service_1.ParticipService, user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService, user_service_1.UserService])
], ParticipListComponent);
exports.ParticipListComponent = ParticipListComponent;
;
//# sourceMappingURL=particip-list.component.js.map