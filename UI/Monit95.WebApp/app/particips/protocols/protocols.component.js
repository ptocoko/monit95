"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_protocols_service_1 = require("../../services/particip-protocols.service");
var PROJECT_TEST_ID = 1;
var ProtocolsComponent = /** @class */ (function () {
    //@ViewChild('participCodeInput') participCodeInput: ElementRef;
    //pipe = new ParticipFilterPipe();
    function ProtocolsComponent(participProtocolsService, router) {
        var _this = this;
        this.participProtocolsService = participProtocolsService;
        this.router = router;
        //isOneMatchedProtocol = false;
        this.AbsentText = 'отсутствовал';
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.QuestionMarks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.QuestionMarks; }).length; };
    }
    ProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participProtocolsService.getProtocolsList().subscribe(function (res) {
            _this.protocols = res;
            //$().ready(() => this.initCodeListener());
        });
    };
    //private initCodeListener() {
    //	this.participCodeInput.nativeElement.focus();
    //	Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
    //		.filter((event: any) => {
    //			console.log(event);
    //			if (event.keyCode === 13) {
    //				return this.isOneMatchedProtocol;
    //			}
    //			else if (this.pipe.transform(this.protocols, event.target.value).length === 1) {
    //				this.isOneMatchedProtocol = true;
    //				return false;
    //			}
    //			else {
    //				this.isOneMatchedProtocol = false;
    //				return false;
    //			}
    //		})
    //		.subscribe(event => this.changeMarks(this.getDocumNumberBySearchText(event.target.value)));
    //}
    //markAsAbsent(protocol: ParticipProtocolModel) {
    //	this.participProtocolsService.markAsAbsent(protocol.DocumNumber).subscribe(res => {
    //		protocol.Marks = this.AbsentText;
    //	});
    //}
    ProtocolsComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/particips/protocol', participTestId]);
    };
    //getDocumNumberBySearchText(searchText: string) {
    //	return this.pipe.transform(this.protocols, searchText)[0].DocumNumber;
    //}
    ProtocolsComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            protocol.QuestionMarks = _this.AbsentText;
        });
    };
    ProtocolsComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/protocols/protocols.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/protocols/protocols.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_protocols_service_1.ParticipProtocolsService,
            router_1.Router])
    ], ProtocolsComponent);
    return ProtocolsComponent;
}());
exports.ProtocolsComponent = ProtocolsComponent;
//# sourceMappingURL=protocols.component.js.map