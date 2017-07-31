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
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var particip_form_component_1 = require("./particip-form/particip-form.component");
var particip_service_1 = require("./particip.service");
var user_service_1 = require("../user.service");
var bootstrap_2 = require("angular2-modal/plugins/bootstrap");
var mock_particips_1 = require("./mock-particips");
var ParticipListComponent = (function () {
    function ParticipListComponent(participService, userService, modal) {
        this.participService = participService;
        this.userService = userService;
        this.modal = modal;
        this.particips = [];
    }
    ParticipListComponent.prototype.ngOnInit = function () {
        //Get participList
        //this.participService.getAll().subscribe((response: Response) => {
        //    this.particips = response.json() as ParticipModel[];
        //    console.log(this.particips);
        //});
        var _this = this;
        this.particips = mock_particips_1.PARTICIPS;
        //Get user name
        this.userService.getAccount().subscribe(function (response) {
            _this.userName = response.json().UserName;
        });
    };
    //console.log(`ParticipListComponent.getUserName(): ${this.userName}`);
    ParticipListComponent.prototype.edit = function (particip) {
        this.modal.open(particip_form_component_1.ParticipFormComponent, angular2_modal_1.overlayConfigFactory(particip, bootstrap_2.BSModalContext))
            .then(function (dialog) {
            dialog.result.then(function (response) {
                //..
            }).catch(function () {
                //..
            });
        });
    };
    return ParticipListComponent;
}());
ParticipListComponent = __decorate([
    core_1.Component({
        selector: "particip-list",
        templateUrl: "./app/particips/particip-list.component.html",
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService,
        user_service_1.UserService,
        bootstrap_1.Modal])
], ParticipListComponent);
exports.ParticipListComponent = ParticipListComponent;
;
//# sourceMappingURL=particip-list.component.js.map