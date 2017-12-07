"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
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
        });
    };
    return QuestionProtocolsList;
}());
QuestionProtocolsList = tslib_1.__decorate([
    core_1.Component({
        templateUrl: "./app/components/rsur/protocols/question-protocols-list.component.html?v=" + new Date().getTime()
    }),
    tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService])
], QuestionProtocolsList);
exports.QuestionProtocolsList = QuestionProtocolsList;
//# sourceMappingURL=question-protocols-list.component.js.map