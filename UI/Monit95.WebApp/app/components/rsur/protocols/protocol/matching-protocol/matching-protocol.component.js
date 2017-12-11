"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../../../services/rsur-protocols.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/filter");
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
            this.focusOnCodeElem();
            var participCodeChange = Observable_1.Observable.fromEvent(this.participCodeElem.nativeElement, 'input')
                .filter(function (event, i) { return event.target.value.length == 5; })
                .subscribe(function (event) { return _this.participCodeSubscriber(event); });
        }
        else {
            this.participCodeElem.nativeElement.value = marksProtocol.ParticipCode;
            this.codeControl.disable();
            this.marksProtocol = marksProtocol;
            $().ready(function () { return _this.initMarkInputs(); });
        }
    };
    MatchingProtocolComponent.prototype.participCodeSubscriber = function (event) {
        var _this = this;
        var elem = event.target;
        var participCode = Number.parseInt(elem.value);
        this.codeControl.markAsTouched(); //отметка поля как 'touched' включает отображение ошибок валидации
        if (this.codeControl.valid) {
            this.codeControl.disable();
            this.isMarksProtocolLoading = true;
            this.rsurProtocolsService.getMarksProtocol(participCode).subscribe(function (res) { return _this.participTestSuccessHandler(res); }, function (error) { return _this.participTestErrorHandler(error); });
        }
    };
    MatchingProtocolComponent.prototype.participTestSuccessHandler = function (res) {
        var _this = this;
        this.marksProtocol = res;
        this.marksProtocol.FileId = this.fileId;
        this.isMarksProtocolLoading = false;
        $().ready(function () {
            _this.initMarkInputs();
        });
    };
    MatchingProtocolComponent.prototype.participTestErrorHandler = function (error) {
        var message = error.error.Message ? error.error.Message : error.message;
        this.codeControl.enable();
        this.codeControl.setErrors({ 'notExistCode': message }); //прицепляем к контролу кастомную ошибку валидации, 
        //содержащее сообщение из ответа сервера
        this.isMarksProtocolLoading = false;
        this.focusOnCodeElem();
    };
    //после отрисовки полей оценок с помощью JQuery прицепляем к каждому полю 
    //обработчик фокуса и переводим фокус на первое поле
    MatchingProtocolComponent.prototype.initMarkInputs = function () {
        this.marksInputs = $('.markInput');
        this.marksInputs.focus(function (event) { return event.target.select(); });
        this.marksInputs.get(0).focus();
    };
    MatchingProtocolComponent.prototype.sendMarks = function () {
        console.log(this.marksProtocol);
    };
    MatchingProtocolComponent.prototype.onMarkChanged = function (event) {
        var elem = event.target;
        var elemIndex = this.marksInputs.index(elem);
        if (elem.value) {
            if (elem.value.match(/^(1|0)$/)) {
                this.marksProtocol.QuestionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
            else {
                elem.value = '1';
                this.marksProtocol.QuestionResults[elemIndex].CurrentMark = 1;
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
        }
    };
    MatchingProtocolComponent.prototype.goToNextInputOrFocusOnSubmitBtn = function (elemIndex) {
        if (elemIndex < this.marksInputs.length - 1) {
            var nextInput = this.marksInputs.get(elemIndex + 1);
            if (!nextInput.value) {
                nextInput.focus();
            }
        }
        else {
            $('#submitBtn').focus();
        }
    };
    MatchingProtocolComponent.prototype.cancel = function () {
        this.location.back();
    };
    MatchingProtocolComponent.prototype.focusOnCodeElem = function () {
        this.renderer.invokeElementMethod(this.participCodeElem.nativeElement, 'focus');
    };
    tslib_1.__decorate([
        core_1.ViewChild('participCode'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], MatchingProtocolComponent.prototype, "participCodeElem", void 0);
    MatchingProtocolComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'matching-protocol-component',
            templateUrl: "./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.css?v=" + new Date().getTime()]
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