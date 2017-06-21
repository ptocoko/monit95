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
var particip_service_1 = require("../particip.service");
var EditParticipComponent = (function () {
    function EditParticipComponent(participService) {
        this.participService = participService;
    }
    return EditParticipComponent;
}());
EditParticipComponent = __decorate([
    core_1.Component({
        selector: 'edit-particip',
        templateUrl: './app/particips/edit-particip/edit-particip.html'
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService])
], EditParticipComponent);
exports.EditParticipComponent = EditParticipComponent;
//# sourceMappingURL=edit-particip.component.js.map