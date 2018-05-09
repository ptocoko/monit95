"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var question_protocols_service_1 = require("../../../services/one-two-three/question-protocols.service");
var router_1 = require("@angular/router");
var ProtocolsListComponent = /** @class */ (function () {
    function ProtocolsListComponent(protocolService, router, route) {
        var _this = this;
        this.protocolService = protocolService;
        this.router = router;
        this.route = route;
        this.protocols = [];
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.Marks; }).length; };
        this.AbsentText = 'отсутствовал';
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.projectTestIds = {
            2033: 'Русский язык',
            2034: 'Математика',
            2035: 'Чтение'
        };
    }
    ProtocolsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            _this.projectTestId = params['projectTestId'];
            _this.TestName = _this.projectTestIds[_this.projectTestId];
        });
    };
    ProtocolsListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.protocolService.getAll(this.projectTestId).subscribe(function (res) {
            _this.protocols = res;
            _this.isLoading = false;
        });
    };
    ProtocolsListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/one-two-three/protocol', participTestId]);
    };
    ProtocolsListComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        this.protocolService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            protocol.Marks = _this.AbsentText;
        });
    };
    ProtocolsListComponent.prototype.selectionChange = function () {
        this.pageIndex = 0;
    };
    ProtocolsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/question-protocols/list/protocols-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/one-two-three/question-protocols/list/protocols-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [question_protocols_service_1.QuestionProtocolService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
exports.ProtocolsListComponent = ProtocolsListComponent;
//# sourceMappingURL=protocols-list.component.js.map