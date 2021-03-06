"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingProtocolComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/filter");
var rsur_protocols_service_1 = require("../../../../services/rsur-protocols.service");
var MatchingProtocolComponent = /** @class */ (function () {
    function MatchingProtocolComponent(rsurProtocolsService, location, route, renderer) {
        this.rsurProtocolsService = rsurProtocolsService;
        this.location = location;
        this.route = route;
        this.renderer = renderer;
        this.isMarksProtocolLoading = false;
        this.codeControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.pattern(/^[0-9]+$/)]);
    }
    MatchingProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.fileId = Number.parseInt(params["id"]);
            _this.rsurProtocolsService.getScan(_this.fileId).subscribe(function (protocolScan) {
                _this.rsurProtocolsService.getMarksProtocolByFileId(_this.fileId).subscribe(function (marksProtocol) {
                    _this.protocolScan = protocolScan;
                    $().ready(function () { return _this.initCallbacks(marksProtocol); });
                });
            });
        });
    };
    MatchingProtocolComponent.prototype.initCallbacks = function (marksProtocol) {
        var _this = this;
        if (!marksProtocol) {
            this.isUpdate = false;
            this.focusOnCodeElem();
            var participCodeChange = Observable_1.Observable.fromEvent(this.participCodeElem.nativeElement, 'input')
                .filter(function (event, i) { return event.target.value.length == 5; })
                .subscribe(function (event) { return _this.participCodeSubscriber(event); });
        }
        else {
            this.isUpdate = true;
            this.participCodeElem.nativeElement.value = marksProtocol.ParticipCode;
            this.codeControl.disable();
            this.marksProtocol = marksProtocol;
        }
    };
    MatchingProtocolComponent.prototype.participCodeSubscriber = function (event) {
        var _this = this;
        var elem = event.target;
        var participCode = Number.parseInt(elem.value);
        this.codeControl.markAsTouched(); //?????????????? ???????? ?????? 'touched' ???????????????? ?????????????????????? ???????????? ??????????????????
        if (this.codeControl.valid) {
            this.codeControl.disable();
            this.isMarksProtocolLoading = true;
            this.rsurProtocolsService.getMarksProtocol(participCode).subscribe(function (res) { return _this.participTestSuccessHandler(res); }, function (error) { return _this.participTestErrorHandler(error); });
        }
    };
    MatchingProtocolComponent.prototype.participTestSuccessHandler = function (marksProtocol) {
        this.marksProtocol = marksProtocol;
        this.marksProtocol.FileId = this.fileId;
        this.isMarksProtocolLoading = false;
    };
    MatchingProtocolComponent.prototype.participTestErrorHandler = function (error) {
        var message = error.error && error.error.Message ? error.error.Message : error.message ? error.message : error;
        this.codeControl.enable();
        this.codeControl.setErrors({ 'serverValidateError': message }); //???????????????????? ?? ???????????????? ?????????????????? ???????????? ??????????????????, 
        //???????????????????? ?????????????????? ???? ???????????? ??????????????
        this.isMarksProtocolLoading = false;
        this.focusOnCodeElem();
    };
    MatchingProtocolComponent.prototype.sendMarks = function (marksProtocol) {
        var _this = this;
        this.rsurProtocolsService.postMarksProtocol(marksProtocol).subscribe(function (response) { return _this.location.back(); });
    };
    MatchingProtocolComponent.prototype.cancel = function () {
        this.location.back();
    };
    MatchingProtocolComponent.prototype.focusOnCodeElem = function () {
        this.renderer.invokeElementMethod(this.participCodeElem.nativeElement, 'focus');
    };
    tslib_1.__decorate([
        (0, core_1.ViewChild)('participCode'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], MatchingProtocolComponent.prototype, "participCodeElem", void 0);
    MatchingProtocolComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'matching-protocol-component',
            templateUrl: "./app/components/rsur/protocols/matching/matching-protocol.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/protocols/matching/matching-protocol.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
            common_1.Location,
            router_1.ActivatedRoute,
            core_1.Renderer])
    ], MatchingProtocolComponent);
    return MatchingProtocolComponent;
}());
exports.MatchingProtocolComponent = MatchingProtocolComponent;
//# sourceMappingURL=matching-protocol.component.js.map