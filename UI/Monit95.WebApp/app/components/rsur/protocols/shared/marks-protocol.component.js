"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var MarksProtocolComponent = /** @class */ (function () {
    function MarksProtocolComponent() {
        this.onSend = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
    }
    MarksProtocolComponent.prototype.ngOnInit = function () {
    };
    MarksProtocolComponent.prototype.ngAfterViewInit = function () {
        this.inputElements = $('.markInput');
        this.inputElements.focus(function (event) { return event.target.select(); });
        this.inputElements.get(0).focus();
        //this.inputElements.get(0).select();
    };
    MarksProtocolComponent.prototype.markChange = function (event, maxMark, step) {
        if (step === void 0) { step = 1; }
        var elem = event.target;
        var elemIndex = this.inputElements.index(elem);
        var mark = Number.parseInt(elem.value);
        var possibleMarks = this.getPossibleMarks(maxMark, step);
        if (elem.value) {
            if (possibleMarks.indexOf(mark) > -1) {
                this.questionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
            else {
                elem.value = maxMark.toString();
                this.questionResults[elemIndex].CurrentMark = maxMark;
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
        }
    };
    MarksProtocolComponent.prototype.getPossibleMarks = function (maxMark, step) {
        var result;
        var current = 0;
        do {
            result.push(current);
            current += step;
        } while (current <= maxMark);
        return result;
    };
    MarksProtocolComponent.prototype.goToNextInputOrFocusOnSubmitBtn = function (elemIndex) {
        if (elemIndex < this.inputElements.length - 1) {
            var nextInput = this.inputElements.get(elemIndex + 1);
            if (!nextInput.value) {
                nextInput.focus();
            }
        }
        else {
            $().ready(function () { return $('#submitBtn').focus(); });
        }
    };
    MarksProtocolComponent.prototype.send = function () {
        this.marksSending = true;
        this.onSend.emit(this.questionResults);
    };
    MarksProtocolComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    tslib_1.__decorate([
        core_1.Input('questions'),
        tslib_1.__metadata("design:type", Array)
    ], MarksProtocolComponent.prototype, "questionResults", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onSend", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onCancel", void 0);
    MarksProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'marks-protocol',
            templateUrl: "./app/components/rsur/protocols/shared/marks-protocol.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/protocols/shared/marks-protocol.component.css?v=" + new Date().getTime()]
        })
    ], MarksProtocolComponent);
    return MarksProtocolComponent;
}());
exports.MarksProtocolComponent = MarksProtocolComponent;
//# sourceMappingURL=marks-protocol.component.js.map