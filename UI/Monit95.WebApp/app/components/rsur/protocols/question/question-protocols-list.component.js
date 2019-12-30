var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
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
        var codeInput$ = fromEvent(this.participCodeInput.nativeElement, 'keyup');
        codeInput$.subscribe(function () { return _this.pageIndex = 0; });
        codeInput$.pipe(filter(function (event) { return event.keyCode === 13 && _this.checkIfOnlyOneMatch(event.target.value); }))
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
    __decorate([
        ViewChild('participCodeInput'),
        __metadata("design:type", ElementRef)
    ], QuestionProtocolsList.prototype, "participCodeInput", void 0);
    QuestionProtocolsList = __decorate([
        Component({
            templateUrl: './question-protocols-list.component.html',
            styleUrls: ['./question-protocols-list.component.css']
        }),
        __metadata("design:paramtypes", [RsurProtocolsService,
            Router])
    ], QuestionProtocolsList);
    return QuestionProtocolsList;
}());
export { QuestionProtocolsList };
//# sourceMappingURL=question-protocols-list.component.js.map