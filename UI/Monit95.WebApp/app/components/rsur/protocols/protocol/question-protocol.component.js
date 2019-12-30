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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';
var QuestionProtocolComponent = /** @class */ (function () {
    function QuestionProtocolComponent(rsurProtocolService, route, location) {
        this.rsurProtocolService = rsurProtocolService;
        this.route = route;
        this.location = location;
    }
    QuestionProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var participCode = params['participCode'];
            _this.rsurProtocolService.getMarksProtocol(participCode).subscribe(function (marksProtocol) {
                _this.marksProtocol = marksProtocol;
            });
        });
    };
    QuestionProtocolComponent.prototype.send = function (questionResults) {
        var _this = this;
        this.marksProtocol.QuestionResults = questionResults;
        this.rsurProtocolService.postMarksProtocol(this.marksProtocol).subscribe(function (response) { return _this.location.back(); });
    };
    QuestionProtocolComponent.prototype.cancel = function () {
        this.location.back();
    };
    QuestionProtocolComponent = __decorate([
        Component({
            templateUrl: './question-protocol.component.html',
        }),
        __metadata("design:paramtypes", [RsurProtocolsService,
            ActivatedRoute,
            Location])
    ], QuestionProtocolComponent);
    return QuestionProtocolComponent;
}());
export { QuestionProtocolComponent };
//# sourceMappingURL=question-protocol.component.js.map