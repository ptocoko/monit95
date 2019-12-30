var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ParticipService } from '../../../services/particip.service';
var OgeParticipsListComponent = /** @class */ (function () {
    function OgeParticipsListComponent(participService) {
        this.participService = participService;
    }
    OgeParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getAllOge().subscribe(function (res) { return _this.particips = res; });
    };
    OgeParticipsListComponent = __decorate([
        Component({
            templateUrl: './particips-list.component.html',
        }),
        __metadata("design:paramtypes", [ParticipService])
    ], OgeParticipsListComponent);
    return OgeParticipsListComponent;
}());
export { OgeParticipsListComponent };
//# sourceMappingURL=particips-list.component.js.map