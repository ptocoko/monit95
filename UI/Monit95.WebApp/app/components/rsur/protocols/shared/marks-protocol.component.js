"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var filter_1 = require("rxjs/operators/filter");
var MarksProtocolComponent = /** @class */ (function () {
    function MarksProtocolComponent() {
        this.onSend = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.optionNumberChange = new core_1.EventEmitter();
    }
    MarksProtocolComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputElements = $('.markInput');
        this.inputElements.focus(function (event) { return event.target.select(); });
        if (this.inputElements.get(0)) {
            this.inputElements.get(0).focus();
            this.inputElements.get(0).setSelectionRange(0, this.inputElements.get(0).value.length);
            this.keyUpSub$ = fromEvent_1.fromEvent(document.getElementsByClassName('markInput'), 'keyup')
                .pipe(filter_1.filter(function (event) { return [38, 40].indexOf(event.keyCode) > -1; }))
                .subscribe(function (event) {
                if (event.keyCode === 40) {
                    _this.focusOnNextElement(event);
                }
                else if (event.keyCode === 38) {
                    _this.focusOnPrevElement(event);
                }
            });
        }
    };
    MarksProtocolComponent.prototype.onOptionNumberChange = function (event) {
        if (event.target.value) {
            var optionNumber = Number.parseInt(event.target.value);
            if (optionNumber === NaN || [1, 2].indexOf(optionNumber) < 0) {
                event.target.value = 2;
                this.optionNumber = 2;
            }
            this.optionNumberChange.emit(this.optionNumber);
            this.focusOnNextElement(event);
        }
    };
    MarksProtocolComponent.prototype.markChange = function (event, maxMark, step) {
        if (step === void 0) { step = 1; }
        var elem = event.target;
        if (elem.value.length >= maxMark.toString().length) {
            var elemIndex = this.inputElements.index(elem);
            if (this.hasOptionNumber) {
                elemIndex--;
            }
            var mark = Number.parseInt(elem.value);
            var possibleMarks = this.getPossibleMarks(maxMark, step);
            if (elem.value) {
                if (possibleMarks.indexOf(mark) > -1) {
                    this.questionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
                    this.focusOnNextElement(event);
                }
                else {
                    elem.value = maxMark.toString();
                    this.questionResults[elemIndex].CurrentMark = maxMark;
                    this.focusOnNextElement(event);
                }
            }
        }
    };
    MarksProtocolComponent.prototype.getPossibleMarks = function (maxMark, step) {
        var result = [];
        var current = 0;
        do {
            result.push(current);
            current += step;
        } while (current <= maxMark);
        return result;
    };
    MarksProtocolComponent.prototype.focusOnNextElement = function (event) {
        var nextInputDiv = event.target.parentElement.nextElementSibling;
        if (nextInputDiv && nextInputDiv.className.includes('form-inline')) {
            nextInputDiv.children[1].focus();
        }
        else {
            $().ready(function () { return $('#submitBtn').focus(); }); // прежде чем перевести фокус на кнопку нужно чтобы ангулар успел сделать кнопку активной
        }
    };
    MarksProtocolComponent.prototype.focusOnPrevElement = function (event) {
        var prevInputDiv = event.target.parentElement.previousElementSibling;
        if (prevInputDiv && prevInputDiv.className.includes('form-inline')) {
            prevInputDiv.children[1].focus();
        }
    };
    MarksProtocolComponent.prototype.isFocused = function (elemSelector) {
        var elem = document.getElementById(elemSelector);
        return elem === document.activeElement;
    };
    MarksProtocolComponent.prototype.send = function () {
        this.marksSending = true;
        this.onSend.emit(this.questionResults);
    };
    MarksProtocolComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    MarksProtocolComponent.prototype.ngOnDestroy = function () {
        if (this.keyUpSub$)
            this.keyUpSub$.unsubscribe();
    };
    tslib_1.__decorate([
        core_1.Input('questions'),
        tslib_1.__metadata("design:type", Array)
    ], MarksProtocolComponent.prototype, "questionResults", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], MarksProtocolComponent.prototype, "hasOptionNumber", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Number)
    ], MarksProtocolComponent.prototype, "optionNumber", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], MarksProtocolComponent.prototype, "showPossibleMarks", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onSend", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onCancel", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "optionNumberChange", void 0);
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
function convertToInput(elem) {
    var inputElem = elem;
    return inputElem;
}
//# sourceMappingURL=marks-protocol.component.js.map