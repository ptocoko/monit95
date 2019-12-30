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
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
var ProtocolComponent = /** @class */ (function () {
    function ProtocolComponent(location, activatedRoute, protocolService) {
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.protocolService = protocolService;
    }
    ProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.protocolSub$ = this.activatedRoute
            .params
            .pipe(switchMap(function (params) {
            _this.participTestId = Number.parseInt(params['participTestId']);
            return _this.protocolService.get(_this.participTestId);
        }))
            .subscribe(function (res) { return _this.protocol = res; });
    };
    ProtocolComponent.prototype.submit = function (questionResults) {
        var _this = this;
        this.protocol.QuestionMarks = questionResults;
        this.protocolService
            .editMarks(this.participTestId, this.protocol)
            .subscribe(function () { return _this.back(); });
        //console.log(this.protocol);
    };
    ProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ProtocolComponent.prototype.ngOnDestroy = function () {
        if (this.protocolSub$)
            this.protocolSub$.unsubscribe();
    };
    ProtocolComponent = __decorate([
        Component({
            templateUrl: './protocol.component.html',
        }),
        __metadata("design:paramtypes", [Location,
            ActivatedRoute,
            QuestionProtocolService])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
export { ProtocolComponent };
//# sourceMappingURL=protocol.component.js.map