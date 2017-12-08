"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var Observable_1 = require("rxjs/Observable");
var QuestionProtocolsList = (function () {
    function QuestionProtocolsList(rsurProtocolsService) {
        var _this = this;
        this.rsurProtocolsService = rsurProtocolsService;
        this.processedProtocols = function () { return _this.questionProtocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.questionProtocols.filter(function (f) { return !f.Marks; }).length; };
    }
    QuestionProtocolsList.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurProtocolsService.getQuestionProtocols().subscribe(function (questionProtocols) {
            _this.questionProtocols = questionProtocols;
            $().ready(function () {
                _this.participCodeInput.nativeElement.focus();
                Observable_1.Observable.fromEvent(_this.participCodeInput.nativeElement, 'keyup')
                    .filter(function (event) { return event.keyCode === 13 && _this.filteredByParticipCode(event.target.value).length === 1; })
                    .subscribe(function (event) { return alert(_this.filteredByParticipCode(event.target.value)[0].ParticipCode); });
            });
        });
    };
    QuestionProtocolsList.prototype.filteredByParticipCode = function (value) {
        return this.questionProtocols.filter(function (f) { return f.ParticipCode.toString().indexOf(value) > -1; });
    };
    QuestionProtocolsList.prototype.markAsAbsent = function (questionProtocol) {
        this.rsurProtocolsService.markAsAbsent(questionProtocol.ParticipTestId)
            .subscribe(function (res) { return questionProtocol.Marks = 'отсутствовал'; });
    };
    return QuestionProtocolsList;
}());
tslib_1.__decorate([
    core_1.ViewChild('participCodeInput'),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], QuestionProtocolsList.prototype, "participCodeInput", void 0);
QuestionProtocolsList = tslib_1.__decorate([
    core_1.Component({
        templateUrl: "./app/components/rsur/protocols/question-protocols-list.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/question-protocols-list.component.css?v=" + new Date().getTime()]
    }),
    tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService])
], QuestionProtocolsList);
exports.QuestionProtocolsList = QuestionProtocolsList;
//# sourceMappingURL=question-protocols-list.component.js.map