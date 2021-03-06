"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipProtocolComponent = void 0;
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
        this.activatedRoute.queryParamMap.subscribe(function (queryParams) {
            _this.hasOptionNumber = queryParams.has('hasOptionNumber');
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.participTestId = Number.parseInt(params['id']);
            _this.protocolsService.getProtocol(_this.participTestId).subscribe(function (res) {
                _this.protocol = res;
                // маппим коллекцию для нормального отображения в компоненте marks-protocol
                _this.questionResults = res.MarkCollection.map(function (val) {
                    var questionRes = {
                        Order: val.Order,
                        CurrentMark: val.AwardedMark,
                        Name: val.Name ? val.Name : val.Order.toString(),
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
        var postDto = {
            OptionNumber: this.optionNumber,
            MarksDict: questionResultsPost
        };
        this.protocolsService
            .postMarksProtocol(postDto, this.participTestId)
            .subscribe(function (_) { return _this.back(); });
    };
    ParticipProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ParticipProtocolComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/particips/protocols/protocol/protocol.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/particips/protocols/protocol/protocol.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [common_1.Location,
            router_1.ActivatedRoute,
            particip_protocols_service_1.ParticipProtocolsService])
    ], ParticipProtocolComponent);
    return ParticipProtocolComponent;
}());
exports.ParticipProtocolComponent = ParticipProtocolComponent;
//# sourceMappingURL=protocol.component.js.map