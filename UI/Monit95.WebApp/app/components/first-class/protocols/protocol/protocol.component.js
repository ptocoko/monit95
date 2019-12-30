var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
var ProtocolComponent = /** @class */ (function () {
    function ProtocolComponent(protocolService, route, location) {
        this.protocolService = protocolService;
        this.route = route;
        this.location = location;
        this.marksSending = false;
    }
    ProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.participTestId = params['participTestId'];
            _this.protocolService.get(_this.participTestId).subscribe(function (protocol) {
                _this.protocol = protocol;
                _this.focusOnInput(0);
            });
        });
    };
    ProtocolComponent.prototype.enterKeyHandler = function (index, evt) {
        evt.preventDefault();
        var input = document.querySelector('#mark' + (index + 1));
        var submitBtn = document.querySelector('#submitBtn');
        input ? input.focus() : submitBtn.focus();
    };
    ProtocolComponent.prototype.send = function () {
        var _this = this;
        if (this.marksForm.valid) {
            this.marksSending = true;
            this.protocolService.edit(this.participTestId, this.protocol).subscribe(function (_) {
                _this.marksSending = false;
                _this.location.back();
            });
        }
        else {
            for (var _i = 0, _a = Object.getOwnPropertyNames(this.marksForm.controls); _i < _a.length; _i++) {
                var propName = _a[_i];
                if (this.marksForm.controls[propName].invalid) {
                    this.focusOnInput(Number.parseInt(propName.slice(-1)));
                    break;
                }
            }
        }
    };
    ProtocolComponent.prototype.cancel = function () { this.location.back(); };
    ProtocolComponent.prototype.focusOnInput = function (index) {
        setTimeout(function () {
            var firstInput = document.querySelector('#mark' + index);
            firstInput && firstInput.focus();
        }, 0);
    };
    __decorate([
        ViewChild('marksForm'),
        __metadata("design:type", NgForm)
    ], ProtocolComponent.prototype, "marksForm", void 0);
    ProtocolComponent = __decorate([
        Component({
            templateUrl: './protocol.component.html',
            styleUrls: ['./protocol.component.css']
        }),
        __metadata("design:paramtypes", [ProtocolsService,
            ActivatedRoute,
            Location])
    ], ProtocolComponent);
    return ProtocolComponent;
}());
export { ProtocolComponent };
//# sourceMappingURL=protocol.component.js.map