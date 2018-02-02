"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var particip_protocols_service_1 = require("../../../services/particip-protocols.service");
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
            _this.restMethod = _this.activatedRoute.snapshot.data.restMethod; // 'POST' or 'PUT'
            console.log(_this.participTestId);
            console.log(_this.restMethod);
            _this.protocolsService.getProtocol(_this.participTestId).subscribe(function (res) {
                _this.protocol = res;
                _this.questionResults = res.MarkCollection.map(function (val) {
                    var questionRes = {
                        Order: val.Order,
                        CurrentMark: val.AwardedMark,
                        Name: val.Order.toString(),
                        MaxMark: val.MaxMark,
                        QuestionResultId: val.QuestionMarkId
                    };
                    return questionRes;
                });
            });
        });
    };
    ParticipProtocolComponent.prototype.submit = function (questionResults) {
        var _this = this;
        if (this.restMethod === 'POST') {
            var questionResultsPost = questionResults.map(function (val) {
                var result = {
                    AwardedMark: val.CurrentMark,
                    Order: val.Order
                };
                return result;
            });
            this.protocolsService
                .postMarksProtocol(questionResultsPost, this.participTestId)
                .subscribe(function (_) { return _this.back(); });
        }
        else if (this.restMethod === 'PUT') {
            var questionResultPut = questionResults.map(function (val) {
                var result = {
                    QuestionResultId: val.QuestionResultId,
                    NewMark: val.CurrentMark
                };
                return result;
            });
            this.protocolsService
                .putMarksProtocol(questionResultPut)
                .subscribe(function (_) { return _this.back(); });
        }
    };
    ParticipProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ParticipProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/protocols/protocol/protocol.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/protocols/protocol/protocol.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [common_1.Location,
            router_1.ActivatedRoute,
            particip_protocols_service_1.ParticipProtocolsService])
    ], ParticipProtocolComponent);
    return ParticipProtocolComponent;
}());
exports.ParticipProtocolComponent = ParticipProtocolComponent;
//# sourceMappingURL=protocol.component.js.map