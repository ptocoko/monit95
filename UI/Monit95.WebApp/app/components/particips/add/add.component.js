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
import { ParticipModel } from '../../../models/particip.model';
import { ParticipsService } from '../../../services/refactored/particips.service';
import { AccountService } from '../../../services/account.service';
import { ActivatedRoute } from '@angular/router';
var CLASSES = [
    {
        Id: '0900',
        Name: '9'
    },
    {
        Id: '1100',
        Name: '11'
    }
];
var AddComponent = /** @class */ (function () {
    function AddComponent(participsService, accountService, location, route) {
        this.participsService = participsService;
        this.accountService = accountService;
        this.location = location;
        this.route = route;
        this.particip = new ParticipModel();
        this.availableClasses = [];
        this.isSending = false;
        this.isConflict = false;
    }
    AddComponent.prototype.ngOnInit = function () {
        this.projectId = this.route.snapshot.queryParams['projectId'];
        this.projectName = this.route.snapshot.queryParams['projectName'];
        this.availableClasses = CLASSES;
    };
    AddComponent.prototype.onSubmit = function () {
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
        this.participsService.post(this.particip, this.projectId).subscribe(function (_) {
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
    AddComponent.prototype.back = function () {
        this.location.back();
    };
    AddComponent = __decorate([
        Component({
            templateUrl: './add.component.html',
            styleUrls: ['./add.component.css']
        }),
        __metadata("design:paramtypes", [ParticipsService,
            AccountService,
            Location,
            ActivatedRoute])
    ], AddComponent);
    return AddComponent;
}());
export { AddComponent };
//# sourceMappingURL=add.component.js.map