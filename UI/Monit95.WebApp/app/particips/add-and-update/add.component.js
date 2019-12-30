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
import { Location } from '@angular/common';
import { ParticipService } from '../../services/particip.service';
import { AccountService } from '../../services/account.service';
import { ParticipModel } from '../../models/particip.model';
import { ActivatedRoute } from '@angular/router';
var AddParticipComponent = /** @class */ (function () {
    function AddParticipComponent(participService, accountService, location, route) {
        this.participService = participService;
        this.accountService = accountService;
        this.location = location;
        this.route = route;
        this.particip = new ParticipModel();
        this.isSending = false;
        this.isConflict = false;
    }
    AddParticipComponent.prototype.ngOnInit = function () {
        this.projectId = this.route.snapshot.data['projectId'];
        this.EgeOrOge = this.route.snapshot.data['projectName'];
    };
    AddParticipComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSending = true;
        this.isConflict = false;
        // избавляемся от пробелов в начале и в конце
        this.particip.Surname = this.particip.Surname.trim();
        this.particip.Name = this.particip.Name.trim();
        if (this.particip.SecondName) {
            this.particip.SecondName = this.particip.SecondName.trim();
        }
        ;
        this.participService.postParticip(this.particip, this.projectId).subscribe(function (_) {
            _this.back();
        }, function (error) {
            _this.isSending = false;
            if (error.status === 409) {
                _this.isConflict = true;
            }
            else {
                throw error;
            }
        });
    };
    AddParticipComponent.prototype.back = function () {
        this.location.back();
    };
    AddParticipComponent = __decorate([
        Component({
            templateUrl: './add.component.html',
            styleUrls: ['./add.component.css']
        }),
        __metadata("design:paramtypes", [ParticipService,
            AccountService,
            Location,
            ActivatedRoute])
    ], AddParticipComponent);
    return AddParticipComponent;
}());
export { AddParticipComponent };
//# sourceMappingURL=add.component.js.map