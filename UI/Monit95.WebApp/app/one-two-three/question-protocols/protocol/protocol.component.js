"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var question_protocols_service_1 = require("../../../services/one-two-three/question-protocols.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var ProtocolComponent = /** @class */ (function () {
    function ProtocolComponent(location, activatedRoute, protocolService) {
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.protocolService = protocolService;
    }
    ProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.participTestId = Number.parseInt(params['participTestId']);
            _this.protocolService.get(_this.participTestId).subscribe(function (res) {
                _this.protocol = res;
            });
        });
    };
    ProtocolComponent.prototype.submit = function (questionResults) {
        var _this = this;
        this.protocolService.editMarks(this.participTestId, questionResults).subscribe(function () { return _this.back(); });
    };
    ProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/question-protocols/protocol/protocol.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [common_1.Location,
            router_1.ActivatedRoute,
            question_protocols_service_1.QuestionProtocolService])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
exports.ProtocolComponent = ProtocolComponent;
//# sourceMappingURL=protocol.component.js.map