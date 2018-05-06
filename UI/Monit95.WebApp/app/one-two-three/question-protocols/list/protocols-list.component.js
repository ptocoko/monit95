"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var question_protocols_service_1 = require("../../../services/one-two-three/question-protocols.service");
var ProtocolsListComponent = /** @class */ (function () {
    function ProtocolsListComponent(protocolService) {
        this.protocolService = protocolService;
        this.protocols = [];
    }
    ProtocolsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.protocolService.getAll().subscribe(function (res) { return _this.protocols = res; });
    };
    ProtocolsListComponent.prototype.markAsAbsent = function (protocol) {
        this.protocolService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            protocol.Marks = 'отсутствовал';
        });
    };
    ProtocolsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/question-protocols/list/protocols-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/one-two-three/question-protocols/list/protocols-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [question_protocols_service_1.QuestionProtocolService])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
exports.ProtocolsListComponent = ProtocolsListComponent;
//# sourceMappingURL=protocols-list.component.js.map