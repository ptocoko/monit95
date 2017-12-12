"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var rsur_protocols_service_1 = require("../../../../services/rsur-protocols.service");
var router_1 = require("@angular/router");
var QuestionProtocolsList = /** @class */ (function () {
    function QuestionProtocolsList(rsurProtocolsService, router) {
        var _this = this;
        this.rsurProtocolsService = rsurProtocolsService;
        this.router = router;
        this.processedProtocols = function () { return _this.questionProtocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.questionProtocols.filter(function (f) { return !f.Marks; }).length; };
    }
    QuestionProtocolsList.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurProtocolsService.getQuestionProtocols().subscribe(function (questionProtocols) {
            _this.questionProtocols = questionProtocols;
            $().ready(function () { return _this.initCodeListener(); });
        });
    };
    QuestionProtocolsList.prototype.initCodeListener = function () {
        var _this = this;
        this.participCodeInput.nativeElement.focus();
        Observable_1.Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
            .filter(function (event) { return event.keyCode === 13 && _this.checkIfOnlyOneMatch(event.target.value); })
            .subscribe(function (event) { return _this.changeMarks(_this.getProtocol(event.target.value).ParticipCode); });
    };
    QuestionProtocolsList.prototype.changeMarks = function (participCode) {
        this.router.navigate(['/rsur/question-protocol', participCode]);
    };
    QuestionProtocolsList.prototype.checkIfOnlyOneMatch = function (participCode) {
        return this.questionProtocols.filter(function (f) { return f.ParticipCode.toString().indexOf(participCode) > -1; }).length === 1;
    };
    QuestionProtocolsList.prototype.getProtocol = function (participCode) {
        return this.questionProtocols.filter(function (f) { return f.ParticipCode.toString().indexOf(participCode) > -1; })[0];
    };
    QuestionProtocolsList.prototype.markAsAbsent = function (questionProtocol) {
        this.rsurProtocolsService.markAsAbsent(questionProtocol.ParticipTestId)
            .subscribe(function (res) { return questionProtocol.Marks = 'отсутствовал'; });
    };
    tslib_1.__decorate([
        core_1.ViewChild('participCodeInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], QuestionProtocolsList.prototype, "participCodeInput", void 0);
    QuestionProtocolsList = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/protocols/question/question-protocols-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/protocols/question/question-protocols-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
            router_1.Router])
    ], QuestionProtocolsList);
    return QuestionProtocolsList;
}());
exports.QuestionProtocolsList = QuestionProtocolsList;
//# sourceMappingURL=question-protocols-list.component.js.map