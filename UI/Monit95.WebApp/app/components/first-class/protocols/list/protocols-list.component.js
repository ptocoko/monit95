"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var protocols_service_1 = require("../../../../services/first-class/protocols.service");
var router_1 = require("@angular/router");
var ProtocolsListComponent = /** @class */ (function () {
    function ProtocolsListComponent(protocolsService, renderer, router) {
        var _this = this;
        this.protocolsService = protocolsService;
        this.renderer = renderer;
        this.router = router;
        this.protocols = [];
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.Marks; }).length; };
        this.AbsentText = 'отсутствовал';
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.isLoading = true;
        this.focusOnFioField = function () { return _this.renderer.selectRootElement(_this.participFioInput.nativeElement).focus(); };
    }
    ProtocolsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.protocolsService.getAll().subscribe(function (protocols) {
            _this.protocols = protocols;
            _this.isLoading = false;
            _this.focusOnFioField();
        });
    };
    ProtocolsListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/first-class/protocol', participTestId]);
    };
    ProtocolsListComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        this.protocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            protocol.Marks = _this.AbsentText;
        });
    };
    ProtocolsListComponent.prototype.selectionChange = function () {
        this.pageIndex = 0;
    };
    tslib_1.__decorate([
        core_1.ViewChild('participFioInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ProtocolsListComponent.prototype, "participFioInput", void 0);
    ProtocolsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/protocols/list/protocols-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/first-class/protocols/list/protocols-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [protocols_service_1.ProtocolsService,
            core_1.Renderer2,
            router_1.Router])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
exports.ProtocolsListComponent = ProtocolsListComponent;
//# sourceMappingURL=protocols-list.component.js.map