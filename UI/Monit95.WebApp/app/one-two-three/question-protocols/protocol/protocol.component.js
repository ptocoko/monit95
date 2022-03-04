"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var question_protocols_service_1 = require("../../../services/one-two-three/question-protocols.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var switchMap_1 = require("rxjs/operators/switchMap");
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
            .pipe((0, switchMap_1.switchMap)(function (params) {
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
    ProtocolComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/one-two-three/question-protocols/protocol/protocol.component.html?v=".concat(new Date().getTime())
        }),
        tslib_1.__metadata("design:paramtypes", [common_1.Location,
            router_1.ActivatedRoute,
            question_protocols_service_1.QuestionProtocolService])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
exports.ProtocolComponent = ProtocolComponent;
//# sourceMappingURL=protocol.component.js.map