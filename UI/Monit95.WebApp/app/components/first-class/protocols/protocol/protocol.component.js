"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var protocols_service_1 = require("../../../../services/first-class/protocols.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var ProtocolComponent = /** @class */ (function () {
    function ProtocolComponent(protocolService, route, location) {
        this.protocolService = protocolService;
        this.route = route;
        this.location = location;
        this.marksSending = false;
    }
    ProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.participTestId = params['participTestId'];
            _this.protocolService.get(_this.participTestId).subscribe(function (protocol) {
                _this.protocol = protocol;
                _this.focusOnInput(0);
            });
        });
    };
    ProtocolComponent.prototype.enterHandler = function (index, evt) {
        evt.preventDefault();
        var input = document.querySelector('#mark' + (index + 1));
        var submitBtn = document.querySelector('#submitBtn');
        input ? input.focus() : submitBtn.focus();
    };
    ProtocolComponent.prototype.send = function () {
        var _this = this;
        this.marksSending = true;
        if (this.checkMarks()) {
            this.protocolService.edit(this.participTestId, this.protocol).subscribe(function (_) {
                _this.marksSending = false;
                _this.location.back();
            });
        }
    };
    ProtocolComponent.prototype.cancel = function () { this.location.back(); };
    ProtocolComponent.prototype.focusOnInput = function (index) {
        setTimeout(function () {
            var firstInput = document.querySelector('#mark' + index);
            firstInput && firstInput.focus();
        }, 0);
    };
    ProtocolComponent.prototype.checkMarks = function () {
        var resBool = true;
        for (var i = 0; i < this.protocol.QuestionResultsList.length; i++) {
            var question = this.protocol.QuestionResultsList[i];
            var possibleMark = this.getPossibleMarks(question.MaxMark, question.Step);
            resBool = possibleMark.indexOf(question.CurrentMark) > -1;
            if (!resBool) {
                this.marksSending = false;
                this.focusOnInput(i);
                this.setValidMsg(question.Name);
                return resBool;
            }
        }
        return resBool;
    };
    ProtocolComponent.prototype.getPossibleMarks = function (maxMark, step) {
        var resArr = [];
        for (var i = 0; i <= maxMark; i += step) {
            resArr.push(i);
        }
        return resArr;
    };
    ProtocolComponent.prototype.setValidMsg = function (questionName) {
        this.validateMsg = "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430 \u0437\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0435 \u00AB" + questionName + "\u00BB";
    };
    ProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/protocols/protocol/protocol.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/first-class/protocols/protocol/protocol.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [protocols_service_1.ProtocolsService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
exports.ProtocolComponent = ProtocolComponent;
//# sourceMappingURL=protocol.component.js.map