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
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../services/class.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
var AddOrUpdateComponent = /** @class */ (function () {
    function AddOrUpdateComponent(participService, classService, router, route, location, fb, renderer) {
        var _this = this;
        this.participService = participService;
        this.classService = classService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.fb = fb;
        this.renderer = renderer;
        this.isUpdate = true;
        this.isLoading = true;
        this.formIsPristine = false;
        this.isConflict = false;
        this.particip = {};
        this.errCallback = function (err) {
            if (err.status === 409) {
                _this.isConflict = true;
                _this.isLoading = false;
                _this.focusOnFirstField();
            }
            else {
                throw err;
            }
        };
        this.saveParticip = function (method, particip, callback) {
            if (callback === void 0) { callback = function () { return _this.location.back(); }; }
            _this.isConflict = false;
            _this.isLoading = true;
            _this.participSaveSub$ = method(particip)
                .subscribe(callback, _this.errCallback);
        };
        this.cancel = function () { return _this.location.back(); };
        this.focusOnFirstField = function () { return _this.renderer.selectRootElement(_this.firstField.nativeElement).focus(); };
    }
    AddOrUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.routeSub$ = this.route.params.subscribe(function (params) {
            _this.isUpdate = params['participId'];
            if (_this.isUpdate) {
                _this.participGetSub$ = _this.participService.get(params['participId']).subscribe(function (res) {
                    _this.particip = res;
                    _this.isLoading = false;
                });
            }
            else {
                _this.isLoading = false;
            }
            _this.classesSub$ = _this.classService.getClasses()
                .subscribe(function (res) { return _this.classes = res.slice(0, 36); });
            _this.focusOnFirstField();
        });
    };
    AddOrUpdateComponent.prototype.createForm = function () {
        this.participForm = this.fb.group({
            surname: ['', [Validators.required, Validators.minLength(3)]],
            name: ['', [Validators.required, Validators.minLength(2)]],
            secondName: ['', Validators.minLength(4)],
            classId: ['', Validators.required]
        });
    };
    AddOrUpdateComponent.prototype.submitForm = function () {
        if (this.participForm.invalid) {
            this.markFieldsAsDirty();
        }
        else if (this.participForm.pristine) {
            this.formIsPristine = true;
        }
        else {
            if (this.isUpdate) {
                this.saveParticip(this.participService.update, this.particip);
            }
            else {
                this.saveParticip(this.participService.post, this.particip);
            }
        }
    };
    AddOrUpdateComponent.prototype.addNext = function () {
        var _this = this;
        if (!this.isUpdate) {
            if (this.participForm.invalid) {
                this.markFieldsAsDirty();
            }
            else if (this.participForm.pristine) {
                this.formIsPristine = true;
            }
            else {
                this.saveParticip(this.participService.post, this.particip, function () {
                    _this.participForm.enable();
                    _this.isLoading = false;
                    _this.participForm.reset({ classId: _this.particip.ClassId });
                    _this.focusOnFirstField();
                });
            }
        }
    };
    AddOrUpdateComponent.prototype.markFieldsAsDirty = function () {
        for (var _i = 0, _a = Object.keys(this.participForm.controls); _i < _a.length; _i++) {
            var control = _a[_i];
            this.participForm.get(control).markAsTouched();
        }
    };
    Object.defineProperty(AddOrUpdateComponent.prototype, "surname", {
        get: function () { return this.participForm.get('surname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "name", {
        get: function () { return this.participForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "secondName", {
        get: function () { return this.participForm.get('secondName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "classId", {
        get: function () { return this.participForm.get('classId'); },
        enumerable: true,
        configurable: true
    });
    AddOrUpdateComponent.prototype.ngOnDestroy = function () {
        if (this.routeSub$)
            this.routeSub$.unsubscribe();
        if (this.participGetSub$)
            this.participGetSub$.unsubscribe();
        if (this.participSaveSub$)
            this.participSaveSub$.unsubscribe();
        if (this.classesSub$)
            this.classesSub$.unsubscribe();
    };
    __decorate([
        ViewChild('surnameInput'),
        __metadata("design:type", ElementRef)
    ], AddOrUpdateComponent.prototype, "firstField", void 0);
    AddOrUpdateComponent = __decorate([
        Component({
            templateUrl: './add-or-update.component.html',
            styleUrls: ['./add-or-update.component.css']
        }),
        __metadata("design:paramtypes", [ParticipService,
            ClassService,
            Router,
            ActivatedRoute,
            Location,
            FormBuilder,
            Renderer2])
    ], AddOrUpdateComponent);
    return AddOrUpdateComponent;
}());
export { AddOrUpdateComponent };
//# sourceMappingURL=add-or-update.component.js.map