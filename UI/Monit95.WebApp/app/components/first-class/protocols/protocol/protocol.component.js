"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var protocols_service_1 = require("../../../../services/first-class/protocols.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
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
                _this.focusById('submark0');
            });
        });
    };
    ProtocolComponent.prototype.enterKeyHandler = function (index, evt) {
        evt.preventDefault();
        var input = document.querySelector('#mark' + (index + 1));
        var submitBtn = document.querySelector('#submitBtn');
        input ? input.focus() : submitBtn.focus();
    };
    ProtocolComponent.prototype.applyMarkAndFocusNextEl = function (val, markDto, nextId, isFirstChanged, isSecondChanged) {
        if (val === '' || val.length !== markDto.MaxMark.toString().length) {
            this.recalcSums(isFirstChanged, isSecondChanged);
            return;
        }
        var currentVal = +val;
        if (isNaN(currentVal) || currentVal > markDto.MaxMark || currentVal < 0) {
            currentVal = markDto.MaxMark;
        }
        markDto.CurrentMark = currentVal;
        this.recalcSums(isFirstChanged, isSecondChanged);
        this.focusById(nextId);
    };
    ProtocolComponent.prototype.recalcSums = function (isFirstChanged, isSecondChanged) {
        if (this.protocol.SubQuestionResults.slice(0, 6).every(function (q) { return q.CurrentMark === 0 ? true : !!q.CurrentMark; }) && isFirstChanged) {
            var first = Math.max(this.protocol.SubQuestionResults[0].CurrentMark, this.protocol.SubQuestionResults[1].CurrentMark, this.protocol.SubQuestionResults[2].CurrentMark) +
                Math.min(this.protocol.SubQuestionResults[0].CurrentMark, this.protocol.SubQuestionResults[1].CurrentMark, this.protocol.SubQuestionResults[2].CurrentMark);
            var second = Math.max(this.protocol.SubQuestionResults[3].CurrentMark, this.protocol.SubQuestionResults[4].CurrentMark, this.protocol.SubQuestionResults[5].CurrentMark) +
                Math.min(this.protocol.SubQuestionResults[3].CurrentMark, this.protocol.SubQuestionResults[4].CurrentMark, this.protocol.SubQuestionResults[5].CurrentMark);
            this.protocol.QuestionResultsList[0].CurrentMark = first + second;
        }
        else if (isFirstChanged) {
            this.protocol.QuestionResultsList[0].CurrentMark = null;
        }
        if (this.protocol.SubQuestionResults.slice(6, 12).every(function (q) { return q.CurrentMark === 0 ? true : !!q.CurrentMark; }) && isSecondChanged) {
            this.protocol.QuestionResultsList[2].CurrentMark = this.protocol.SubQuestionResults.slice(6, 12).map(function (q) { return q.CurrentMark; }).reduce(function (prev, curr) { return prev += curr; }, 0);
        }
        else if (isSecondChanged) {
            this.protocol.QuestionResultsList[2].CurrentMark = null;
        }
    };
    ProtocolComponent.prototype.focusById = function (id) {
        setTimeout(function () {
            var el = document.getElementById(id);
            el.focus();
            el.select && el.select();
        }, 0);
    };
    ProtocolComponent.prototype.send = function () {
        var _this = this;
        if (this.marksForm.valid) {
            this.marksSending = true;
            this.protocolService.edit(this.participTestId, this.protocol).subscribe(function (_) {
                _this.marksSending = false;
                _this.location.back();
            });
        }
        else {
            for (var _i = 0, _a = Object.getOwnPropertyNames(this.marksForm.controls); _i < _a.length; _i++) {
                var propName = _a[_i];
                if (this.marksForm.controls[propName].invalid) {
                    this.focusOnInput(Number.parseInt(propName.slice(-1)));
                    break;
                }
            }
        }
    };
    ProtocolComponent.prototype.cancel = function () { this.location.back(); };
    ProtocolComponent.prototype.focusOnInput = function (index) {
        setTimeout(function () {
            var firstInput = document.querySelector('#mark' + index);
            firstInput && firstInput.focus();
        }, 0);
    };
    tslib_1.__decorate([
        (0, core_1.ViewChild)('marksForm'),
        tslib_1.__metadata("design:type", forms_1.NgForm)
    ], ProtocolComponent.prototype, "marksForm", void 0);
    ProtocolComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/first-class/protocols/protocol/protocol.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/first-class/protocols/protocol/protocol.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [protocols_service_1.ProtocolsService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
exports.ProtocolComponent = ProtocolComponent;
//# sourceMappingURL=protocol.component.js.map