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
//import { DialogRef, Overlay, overlayConfigFactory } from "angular2-modal";
var angular2_modal_1 = require("angular2-modal");
//import { Modal, BSModalContext } from "angular2-modal/plugins/bootstrap";
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var results_modal_component_1 = require("./results/results-modal.component");
//import { UserModel } from "../user.model";
//import { PARTICIPS } from "./mock-particips";
var particip_service_1 = require("./particip.service");
var user_service_1 = require("../user.service");
var ParticipListComponent = (function () {
    function ParticipListComponent(participService, userService, modal) {
        this.participService = participService;
        this.userService = userService;
        this.modal = modal;
        this.particips = [];
    }
    ParticipListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Get participList
        this.participService.getAll().subscribe(function (response) {
            _this.particips = response.json();
            console.log(_this.particips);
        });
        //Get user's names
        this.userService.getName().then(function (response) {
            _this.userName = response;
        });
        console.log("ParticipListComponent.getUserName(): " + this.userName);
    };
    ParticipListComponent.prototype.openModal = function (particip) {
        this.modal.open(results_modal_component_1.ResultsModalComponent, angular2_modal_1.overlayConfigFactory(particip));
    };
    return ParticipListComponent;
}());
ParticipListComponent = __decorate([
    core_1.Component({
        selector: "particip-list",
        templateUrl: "./app/particips/particip-list.html",
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService,
        user_service_1.UserService,
        bootstrap_1.Modal])
], ParticipListComponent);
exports.ParticipListComponent = ParticipListComponent;
;
//# sourceMappingURL=particip-list.component.js.map