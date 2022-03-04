"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionProtocolsList = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../../services/rsur-protocols.service");
var router_1 = require("@angular/router");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var filter_1 = require("rxjs/operators/filter");
var QuestionProtocolsList = /** @class */ (function () {
    function QuestionProtocolsList(rsurProtocolsService, router) {
        var _this = this;
        this.rsurProtocolsService = rsurProtocolsService;
        this.router = router;
        this.questionProtocols = new Array();
        this.processedProtocols = function () { return _this.questionProtocols.filter(function (f) { return f.RsurQuestionValues; }).length; };
        this.notProcessedProtocols = function () { return _this.questionProtocols.filter(function (f) { return !f.RsurQuestionValues; }).length; };
        this.limitToVal = 20;
        this.pageIndex = 0;
    }
    QuestionProtocolsList.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rsurProtocolsService.getQuestionProtocols().subscribe(function (questionProtocols) {
            _this.questionProtocols = questionProtocols;
            _this.initCodeListener();
        });
    };
    QuestionProtocolsList.prototype.initCodeListener = function () {
        var _this = this;
        this.participCodeInput.nativeElement.focus();
        var codeInput$ = (0, fromEvent_1.fromEvent)(this.participCodeInput.nativeElement, 'keyup');
        codeInput$.subscribe(function () { return _this.pageIndex = 0; });
        codeInput$.pipe((0, filter_1.filter)(function (event) { return event.keyCode === 13 && _this.checkIfOnlyOneMatch(event.target.value); }))
            .subscribe(function (event) { return _this.changeMarks(_this.getProtocol(event.target.value).ParticipCode); });
    };
    QuestionProtocolsList.prototype.changeMarks = function (participCode) {
        this.router.navigate(['/rsur/question-protocol', participCode]);
    };
    QuestionProtocolsList.prototype.checkIfOnlyOneMatch = function (participCode) {
        return this.questionProtocols.filter(function (f) { return f.ParticipCode.toString().indexOf(participCode) > -1; }).length === 1;
    };
    QuestionProtocolsList.prototype.getProtocol = function (participCode) {
        return this.questionProtocols.find(function (f) { return f.ParticipCode.toString().indexOf(participCode) > -1; });
    };
    QuestionProtocolsList.prototype.markAsAbsent = function (questionProtocol) {
        this.rsurProtocolsService.markAsAbsent(questionProtocol.ParticipTestId)
            .subscribe(function (res) { return questionProtocol.RsurQuestionValues = 'отсутствовал'; });
    };
    tslib_1.__decorate([
        (0, core_1.ViewChild)('participCodeInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], QuestionProtocolsList.prototype, "participCodeInput", void 0);
    QuestionProtocolsList = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/rsur/protocols/question/question-protocols-list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/protocols/question/question-protocols-list.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
            router_1.Router])
    ], QuestionProtocolsList);
    return QuestionProtocolsList;
}());
exports.QuestionProtocolsList = QuestionProtocolsList;
//# sourceMappingURL=question-protocols-list.component.js.map