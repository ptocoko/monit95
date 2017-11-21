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
var rsur_protocols_service_1 = require("../../../../../services/rsur-protocols.service");
var common_1 = require("@angular/common");
var MatchingProtocolComponent = (function () {
    function MatchingProtocolComponent(rsurProtocolsService, location) {
        this.rsurProtocolsService = rsurProtocolsService;
        this.location = location;
        this.protocolScan = {};
        this.markNames = new Array(15);
        this.marks = new Array(15);
        this.markNames.fill('8.1');
    }
    MatchingProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurProtocolsService.getScan().subscribe(function (res) {
            _this.protocolScan = res;
            $(document).ready(function () {
                _this.marksInputs = $('.markInput');
                _this.marksInputs.get(0).focus();
                _this.marksInputs.get(0).select();
                _this.marksInputs.focus(function (event) { return event.target.select(); });
            });
        });
    };
    MatchingProtocolComponent.prototype.onSubmit = function () {
        console.log(this.rsurParticipCode);
    };
    MatchingProtocolComponent.prototype.onMarkChanged = function (event) {
        var elem = event.target;
        var elemIndex = this.marksInputs.index(elem);
        if (elem.value) {
            if (elem.value.match(/^(1|0)$/)) {
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
            else {
                elem.value = '1';
                this.marks[elemIndex] = '1';
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
        }
    };
    MatchingProtocolComponent.prototype.goToNextInputOrFocusOnSubmitBtn = function (elemIndex) {
        if (elemIndex < this.marksInputs.length - 1) {
            var nextInput = this.marksInputs.get(elemIndex + 1);
            nextInput.focus();
        }
        else {
            $('#submitBtn').focus();
        }
    };
    MatchingProtocolComponent.prototype.cancel = function () {
        this.location.back();
    };
    return MatchingProtocolComponent;
}());
MatchingProtocolComponent = __decorate([
    core_1.Component({
        selector: 'matching-protocol-component',
        templateUrl: "./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService, common_1.Location])
], MatchingProtocolComponent);
exports.MatchingProtocolComponent = MatchingProtocolComponent;
//# sourceMappingURL=matching-protocol.component.js.map