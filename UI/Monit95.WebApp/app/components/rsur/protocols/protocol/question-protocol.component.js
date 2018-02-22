"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var rsur_protocols_service_1 = require("../../../../services/rsur-protocols.service");
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
    QuestionProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/protocols/protocol/question-protocol.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], QuestionProtocolComponent);
    return QuestionProtocolComponent;
}());
exports.QuestionProtocolComponent = QuestionProtocolComponent;
//# sourceMappingURL=question-protocol.component.js.map