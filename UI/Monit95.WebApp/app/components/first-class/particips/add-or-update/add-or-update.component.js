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
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ClassService } from '../../../../services/class.service';
import { ParticipService } from '../../../../services/first-class/particips.service';
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/local-storage';
import { CLASS_ID_KEY } from '../list/particips-list.component';
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
        this.monthDays = Array.from({ length: 32 }, function (val, key) { return key; }).splice(1).slice();
        this.months = [
            {
                index: 0,
                name: 'Январь'
            },
            {
                index: 1,
                name: 'Февраль'
            },
            {
                index: 2,
                name: 'Март'
            },
            {
                index: 3,
                name: 'Апрель'
            },
            {
                index: 4,
                name: 'Май'
            },
            {
                index: 5,
                name: 'Июнь'
            },
            {
                index: 6,
                name: 'Июль'
            },
            {
                index: 7,
                name: 'Август'
            },
            {
                index: 8,
                name: 'Сентябрь'
            },
            {
                index: 9,
                name: 'Октябрь'
            },
            {
                index: 10,
                name: 'Ноябрь'
            },
            {
                index: 11,
                name: 'Декабрь'
            }
        ];
        this.years = [2009, 2010, 2011, 2012, 2013, 2014];
        this.particip = {};
        this.cancel = function () { return _this.location.back(); };
        this.focusOnFirstField = function () { return _this.renderer.selectRootElement(_this.firstField.nativeElement).focus(); };
    }
    AddOrUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.setFormDefault();
        this.route.params.subscribe(function (params) {
            _this.isUpdate = params['participId'];
            if (_this.isUpdate) {
                _this.participService.get(params['participId']).subscribe(function (res) {
                    _this.particip = res;
                    _this.setForm();
                    _this.isLoading = false;
                });
            }
            else {
                _this.isLoading = false;
            }
            _this.classService.getClasses().subscribe(function (res) { return _this.classes = res.slice(0, 12); });
            _this.focusOnFirstField();
        });
    };
    AddOrUpdateComponent.prototype.createForm = function () {
        this.participForm = this.fb.group({
            surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            secondName: ['', Validators.maxLength(25)],
            birthday: this.fb.group({
                day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
                month: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
                year: ['', [Validators.required, Validators.min(2009), Validators.max(2014)]]
            }),
            classId: ['', Validators.required],
            wasDoo: false
        });
    };
    AddOrUpdateComponent.prototype.setForm = function () {
        this.participForm.patchValue({
            surname: this.particip.Surname,
            name: this.particip.Name,
            secondName: this.particip.SecondName,
            classId: this.particip.ClassId,
            wasDoo: this.particip.WasDoo
        });
        if (this.particip.Birthday) {
            this.particip.Birthday = new Date(this.particip.Birthday);
            this.participForm.get('birthday').patchValue({
                day: this.particip.Birthday.getDate(),
                month: this.particip.Birthday.getMonth(),
                year: this.particip.Birthday.getFullYear()
            });
        }
    };
    AddOrUpdateComponent.prototype.classChanged = function () {
        if (this.classId.value && this.classId.value.length > 0) {
            setToLocalStorage(CLASS_ID_KEY, this.classId.value);
        }
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
                this.putParticip(this.convertParticip());
            }
            else {
                this.postParticip(this.convertParticip());
            }
        }
    };
    AddOrUpdateComponent.prototype.addNext = function () {
        var _this = this;
        if (!this.isUpdate) {
            this.isLoading = true;
            if (this.participForm.invalid) {
                this.markFieldsAsDirty();
                this.isLoading = false;
            }
            else if (this.participForm.pristine) {
                this.formIsPristine = true;
                this.isLoading = false;
            }
            else {
                this.postParticip(this.convertParticip(), function () {
                    _this.participForm.enable();
                    _this.isLoading = false;
                    _this.particip = {};
                    _this.setFormDefault();
                    _this.focusOnFirstField();
                });
            }
        }
    };
    AddOrUpdateComponent.prototype.setFormDefault = function () {
        var classId = getFromLocalStorage('FIRST_CLASS_ID');
        this.participForm.reset();
        this.participForm.patchValue({ wasDoo: false, classId: classId });
    };
    AddOrUpdateComponent.prototype.convertParticip = function () {
        var birthday = new Date(this.birthday.year.value, this.birthday.month.value, this.birthday.day.value + 1);
        return {
            Id: this.particip.Id,
            Surname: this.surname.value,
            Name: this.name.value,
            SecondName: this.secondName.value,
            Birthday: birthday,
            ClassId: this.classId.value,
            WasDoo: this.wasDoo.value
        };
    };
    /**
     * Вызывает метод POST сервиса ParticipService, по умолчанию в коллбэк подписки вызывается location.back
     * @param particip
     * @param callback next-коллбэк для subscribe (по умолчанию вызывается location.back)
     */
    AddOrUpdateComponent.prototype.postParticip = function (particip, callback) {
        var _this = this;
        this.participService.post(particip).subscribe(callback ? callback : function () { return _this.location.back(); });
    };
    /**
     * Вызывает метод PUT сервиса ParticipService, по умолчанию в коллбэк подписки вызывается location.back
     * @param particip
     * @param callback next-коллбэк для subscribe (по умолчанию вызывается location.back)
     */
    AddOrUpdateComponent.prototype.putParticip = function (particip, callback) {
        var _this = this;
        this.participService.update(particip).subscribe(callback ? callback : function () { return _this.location.back(); });
    };
    AddOrUpdateComponent.prototype.markFieldsAsDirty = function () {
        for (var _i = 0, _a = Object.keys(this.participForm.controls); _i < _a.length; _i++) {
            var control = _a[_i];
            this.participForm.get(control).markAsTouched();
        }
        for (var _b = 0, _c = Object.keys(this.birthday); _b < _c.length; _b++) {
            var birthdayCtrl = _c[_b];
            this.birthday[birthdayCtrl].markAsTouched();
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
    Object.defineProperty(AddOrUpdateComponent.prototype, "birthday", {
        get: function () {
            var birthdayFb = this.participForm.get('birthday');
            return {
                day: birthdayFb.get('day'),
                month: birthdayFb.get('month'),
                year: birthdayFb.get('year')
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "wasDoo", {
        get: function () { return this.participForm.get('wasDoo'); },
        enumerable: true,
        configurable: true
    });
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