var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
var MarksProtocolComponent = /** @class */ (function () {
    function MarksProtocolComponent() {
        this.onSend = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.optionNumberChange = new EventEmitter();
    }
    MarksProtocolComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputElements = $('.markInput');
        this.inputElements.focus(function (event) { return event.target.select(); });
        if (this.inputElements.get(0)) {
            this.inputElements.get(0).focus();
            this.inputElements.get(0).setSelectionRange(0, this.inputElements.get(0).value.length);
            this.keyUpSub$ = fromEvent(document.getElementsByClassName('markInput'), 'keyup')
                .pipe(filter(function (event) { return [38, 40].indexOf(event.keyCode) > -1; }))
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
    __decorate([
        Input('questions'),
        __metadata("design:type", Array)
    ], MarksProtocolComponent.prototype, "questionResults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MarksProtocolComponent.prototype, "hasOptionNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MarksProtocolComponent.prototype, "optionNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MarksProtocolComponent.prototype, "showPossibleMarks", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onSend", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "onCancel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MarksProtocolComponent.prototype, "optionNumberChange", void 0);
    MarksProtocolComponent = __decorate([
        Component({
            selector: 'marks-protocol',
            templateUrl: './marks-protocol.component.html',
            styleUrls: ['./marks-protocol.component.css']
        })
    ], MarksProtocolComponent);
    return MarksProtocolComponent;
}());
export { MarksProtocolComponent };
function convertToInput(elem) {
    var inputElem = elem;
    return inputElem;
}
//# sourceMappingURL=marks-protocol.component.js.map