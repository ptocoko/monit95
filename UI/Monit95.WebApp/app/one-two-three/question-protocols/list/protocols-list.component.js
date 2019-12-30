var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { Router, ActivatedRoute } from '@angular/router';
var ProtocolsListComponent = /** @class */ (function () {
    function ProtocolsListComponent(protocolService, router, route, renderer) {
        var _this = this;
        this.protocolService = protocolService;
        this.router = router;
        this.route = route;
        this.renderer = renderer;
        this.protocols = [];
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.Marks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.Marks; }).length; };
        this.AbsentText = 'отсутствовал';
        this.pageIndex = 0;
        this.limitToVal = 20;
        this.focusOnFioField = function () { return _this.renderer.selectRootElement(_this.participFioInput.nativeElement).focus(); };
        this.projectTestIds = {
            3069: 'Русский язык',
            3070: 'Математика',
            3071: 'Чтение',
            3072: 'Русский язык',
            3073: 'Математика',
            3074: 'Чтение',
            3075: 'Русский язык',
            3076: 'Математика',
            3077: 'Чтение'
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
            _this.focusOnFioField();
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
    __decorate([
        ViewChild('participFioInput'),
        __metadata("design:type", ElementRef)
    ], ProtocolsListComponent.prototype, "participFioInput", void 0);
    ProtocolsListComponent = __decorate([
        Component({
            templateUrl: './protocols-list.component.html',
            styleUrls: ['./protocols-list.component.css']
        }),
        __metadata("design:paramtypes", [QuestionProtocolService,
            Router,
            ActivatedRoute,
            Renderer2])
    ], ProtocolsListComponent);
    return ProtocolsListComponent;
}());
export { ProtocolsListComponent };
//# sourceMappingURL=protocols-list.component.js.map