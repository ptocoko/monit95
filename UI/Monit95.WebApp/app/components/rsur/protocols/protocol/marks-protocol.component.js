"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var MarksProtocolComponent = (function () {
    function MarksProtocolComponent() {
        this.onSend = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
    }
    MarksProtocolComponent.prototype.ngOnInit = function () {
    };
    MarksProtocolComponent.prototype.ngAfterViewInit = function () {
        //let elements = document.getElementsByClassName('markInput')
        //Observable.fromEvent(document.getElementsByClassName('markInput'), 'input')
        //	.subscribe((event: any) => {
        //		console.log(event);
        //	});
        console.log(this.marksForm);
    };
    MarksProtocolComponent.prototype.send = function () {
        this.onSend.emit(this.marksProtocol);
    };
    MarksProtocolComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    return MarksProtocolComponent;
}());
tslib_1.__decorate([
    core_1.ViewChild('marksForm'),
    tslib_1.__metadata("design:type", Object)
], MarksProtocolComponent.prototype, "marksForm", void 0);
tslib_1.__decorate([
    core_1.Input('protocol'),
    tslib_1.__metadata("design:type", Object)
], MarksProtocolComponent.prototype, "marksProtocol", void 0);
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], MarksProtocolComponent.prototype, "showParticipCode", void 0);
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
        templateUrl: "./app/components/rsur/protocols/protocol/marks-protocol.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/protocol/marks-protocol.component.css?v=" + new Date().getTime()]
    })
], MarksProtocolComponent);
exports.MarksProtocolComponent = MarksProtocolComponent;
//# sourceMappingURL=marks-protocol.component.js.map