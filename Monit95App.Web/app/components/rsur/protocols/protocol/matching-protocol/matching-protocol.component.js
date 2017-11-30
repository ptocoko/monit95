"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../../../services/rsur-protocols.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/filter");
var MatchingProtocolComponent = (function () {
    function MatchingProtocolComponent(rsurProtocolsService, location, route, renderer) {
        this.rsurProtocolsService = rsurProtocolsService;
        this.location = location;
        this.route = route;
        this.renderer = renderer;
        this.isMarksProtocolLoading = false;
        this.participCodeControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.pattern(/^[0-9]+$/)]);
    }
    MatchingProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.isScanLoading = true;
        this.route.params.subscribe(function (params) {
            var fileId = params["id"];
            _this.rsurProtocolsService.getScan(fileId).subscribe(function (res) {
                _this.protocolScan = res;
                //this.isScanLoading = false;
                $().ready(function () { return _this.initCallbacks(); }); //JQuery.ready заставляет ждать до конца отрисовки DOM
            });
        });
    };
    MatchingProtocolComponent.prototype.initCallbacks = function () {
        var _this = this;
        this.focusOnCodeElem();
        var participCodeChange = Observable_1.Observable.fromEvent(this.participCodeElem.nativeElement, 'input')
            .filter(function (event, i) { return event.target.value.length == 5; })
            .subscribe(function (event) { return _this.participCodeSubscriber(event); });
    };
    MatchingProtocolComponent.prototype.participCodeSubscriber = function (event) {
        var _this = this;
        var elem = event.target;
        var participCode = Number.parseInt(elem.value);
        this.participCodeControl.markAsTouched(); //отметка поля как 'touched' включает отображение ошибок валидации
        if (this.participCodeControl.valid) {
            this.participCodeControl.disable();
            this.isMarksProtocolLoading = true;
            this.rsurProtocolsService.getMarksProtocol(participCode).subscribe(function (res) { return _this.participTestSuccessHandler(res); }, function (error) { return _this.participTestErrorHandler(error); });
        }
    };
    MatchingProtocolComponent.prototype.participTestSuccessHandler = function (res) {
        var _this = this;
        this.marksProtocol = res;
        this.isMarksProtocolLoading = false;
        $().ready(function () {
            //обработчик фокуса и переводим фокус на первое поле
            _this.marksInputs = $('.markInput');
            _this.marksInputs.focus(function (event) { return event.target.select(); });
            _this.marksInputs.get(0).focus();
        });
    };
    MatchingProtocolComponent.prototype.participTestErrorHandler = function (error) {
        var message = error.message ? error.message : error;
        this.participCodeControl.enable();
        this.participCodeControl.setErrors({ 'notExistCode': message }); //прицепляем к контролу кастомную ошибку валидации, 
        //содержащее сообщение из ответа сервера
        this.isMarksProtocolLoading = false;
        this.focusOnCodeElem();
    };
    MatchingProtocolComponent.prototype.sendMarks = function () {
        var marks = this.marksProtocol.QuestionResults.map(function (val) { return val.CurrentMark; }).join(';');
        var participMarks = {
            ParticipTestId: this.marksProtocol.ParticipTestId,
            Marks: marks
        };
        console.log(participMarks);
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
            nextInput.focus();
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
    return MatchingProtocolComponent;
}());
__decorate([
    core_1.ViewChild('participCode'),
    __metadata("design:type", core_1.ElementRef)
], MatchingProtocolComponent.prototype, "participCodeElem", void 0);
MatchingProtocolComponent = __decorate([
    core_1.Component({
        selector: 'matching-protocol-component',
        templateUrl: "./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/protocol/matching-protocol/matching-protocol.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
        common_1.Location,
        router_1.ActivatedRoute,
        core_1.Renderer])
], MatchingProtocolComponent);
exports.MatchingProtocolComponent = MatchingProtocolComponent;
//# sourceMappingURL=matching-protocol.component.js.map