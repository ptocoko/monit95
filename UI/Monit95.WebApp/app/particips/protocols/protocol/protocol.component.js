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
            _this.documNumber = Number.parseInt(params['documNumber']);
            console.log(_this.documNumber);
            _this.protocolsService.getProtocol(_this.documNumber).subscribe(function (res) {
                _this.protocol = res;
            });
        });
    };
    ParticipProtocolComponent.prototype.submit = function (questionResults) {
        var _this = this;
        this.protocolsService
            .postMarksProtocol(questionResults, this.documNumber)
            .subscribe(function (res) { return _this.back(); });
    };
    ParticipProtocolComponent.prototype.back = function () {
        this.location.back();
    };
    ParticipProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/protocols/protocol/protocol.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [common_1.Location,
            router_1.ActivatedRoute,
            particip_protocols_service_1.ParticipProtocolsService])
    ], ParticipProtocolComponent);
    return ParticipProtocolComponent;
}());
exports.ParticipProtocolComponent = ParticipProtocolComponent;
//# sourceMappingURL=protocol.component.js.map