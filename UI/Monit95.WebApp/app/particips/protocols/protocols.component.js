"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_protocols_service_1 = require("../../services/particip-protocols.service");
var Observable_1 = require("rxjs/Observable");
var particip_filter_pipe_1 = require("../../pipes/particip-filter.pipe");
var PROJECT_TEST_ID = 1;
var ProtocolsComponent = /** @class */ (function () {
    function ProtocolsComponent(participProtocolsService, router) {
        var _this = this;
        this.participProtocolsService = participProtocolsService;
        this.router = router;
        this.isOneMatchedProtocol = false;
        this.AbsentText = 'отсутствовал';
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.Marks; }).length; };
    }
    ProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participProtocolsService.getProtocolsList(PROJECT_TEST_ID).subscribe(function (res) {
            console.log(res);
            _this.protocols = res;
            $.ready.then(function () { return _this.initCodeListener(); });
        });
    };
    ProtocolsComponent.prototype.initCodeListener = function () {
        var _this = this;
        console.log(this.pipe);
        this.participCodeInput.nativeElement.focus();
        Observable_1.Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
            .filter(function (event) {
            if (event.keyCode === 13) {
                return _this.isOneMatchedProtocol;
            }
            else if (_this.pipe.transform(_this.protocols, event.target.value).length === 1) {
                _this.isOneMatchedProtocol = true;
                return false;
            }
            return false;
        })
            .subscribe(function (event) { return _this.changeMarks(_this.getDocumNumberBySearchText(event.target.value)); });
    };
    ProtocolsComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (res) {
            protocol.Marks = _this.AbsentText;
        });
    };
    ProtocolsComponent.prototype.changeMarks = function (documNumber) {
        this.router.navigate(['/particips/protocol', documNumber]);
    };
    ProtocolsComponent.prototype.getDocumNumberBySearchText = function (searchText) {
        return this.pipe.transform(this.protocols, searchText)[0].DocumNumber;
    };
    tslib_1.__decorate([
        core_1.ViewChild('participCodeInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ProtocolsComponent.prototype, "participCodeInput", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(particip_filter_pipe_1.ParticipFilterPipe),
        tslib_1.__metadata("design:type", particip_filter_pipe_1.ParticipFilterPipe)
    ], ProtocolsComponent.prototype, "pipe", void 0);
    ProtocolsComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/protocols/protocols.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [particip_protocols_service_1.ParticipProtocolsService,
            router_1.Router])
    ], ProtocolsComponent);
    return ProtocolsComponent;
}());
exports.ProtocolsComponent = ProtocolsComponent;
//# sourceMappingURL=protocols.component.js.map