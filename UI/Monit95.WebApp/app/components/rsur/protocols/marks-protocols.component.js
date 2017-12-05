"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var MarksProtocolsComponent = (function () {
    function MarksProtocolsComponent(rsurProtocolsService) {
        this.rsurProtocolsService = rsurProtocolsService;
    }
    MarksProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurProtocolsService.getParticipProtocols().subscribe(function (res) { return _this.participProtocols = res; });
    };
    MarksProtocolsComponent.prototype.deleteResult = function (protocol, elem) {
        elem.setAttribute('[disabled]', 'true');
        this.rsurProtocolsService.deleteTestResult(protocol.ParticipTestId).subscribe(function (res) {
            protocol.SourceFileName = undefined;
            protocol.Marks = undefined;
            elem.removeAttribute('[disabled]');
        });
    };
    return MarksProtocolsComponent;
}());
MarksProtocolsComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/components/rsur/protocols/marks-protocols.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/marks-protocols.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService])
], MarksProtocolsComponent);
exports.MarksProtocolsComponent = MarksProtocolsComponent;
//# sourceMappingURL=marks-protocols.component.js.map