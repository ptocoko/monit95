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
import { ParticipProtocolsService } from '../../../services/particip-protocols.service';
var ParticipProtocolComponent = /** @class */ (function () {
    function ParticipProtocolComponent(location, activatedRoute, protocolsService) {
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.protocolsService = protocolsService;
    }
    ParticipProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.participTestId = Number.parseInt(params['id']);
            _this.protocolsService.getProtocol(_this.participTestId).subscribe(function (res) {
                _this.protocol = res;
                // маппим коллекцию для нормального отображения в компоненте marks-protocol
                _this.questionResults = res.MarkCollection.map(function (val) {
                    var questionRes = {
                        Order: val.Order,
                        CurrentMark: val.AwardedMark,
                        Name: val.Order.toString(),
                        MaxMark: val.MaxMark,
                        QuestionId: val.QuestionMarkId
                    };
                    return questionRes;
                });
            });
        });
    };
    // компонент marks-protocol возвращает массив QuestionResult: превращаем его словарь и отправляем на сервер
    ParticipProtocolComponent.prototype.submit = function (questionResults) {
        var _this = this;
        var questionResultsPost = {};
        questionResults.forEach(function (val) { return questionResultsPost[val.Order] = val.CurrentMark; });
        this.protocolsService
            .postMarksProtocol(questionResultsPost, this.participTestId)
            .subscribe(function (_) { return _this.back(); });
    };
    ParticipProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ParticipProtocolComponent = __decorate([
        Component({
            templateUrl: './protocol.component.html',
            styleUrls: ['./protocol.component.css']
        }),
        __metadata("design:paramtypes", [Location,
            ActivatedRoute,
            ParticipProtocolsService])
    ], ParticipProtocolComponent);
    return ParticipProtocolComponent;
}());
export { ParticipProtocolComponent };
//# sourceMappingURL=protocol.component.js.map