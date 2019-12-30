var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AccountService } from '../../../../../services/account.service';
var CreateParticipComponent = /** @class */ (function () {
    function CreateParticipComponent(participService, fb, renderer, location, accountService) {
        var _this = this;
        this.participService = participService;
        this.fb = fb;
        this.renderer = renderer;
        this.location = location;
        this.accountService = accountService;
        this.conflict = new EventEmitter();
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
        this.years = Array.from({ length: 60 }, function (val, key) { return key + 1945; }).slice();
        this.subjects = [
            //{
            //	code: 1,
            //	name: 'Русский язык'
            //},
            //{
            //	code: 2,
            //	name: 'Математика'
            //},
            //{
            //	code: 7,
            //	name: 'История'
            //},
            //{
            //	code: 8,
            //	name: 'География'
            //},
            //{
            //	code: 3,
            //	name: 'Физика'
            //},
            {
                code: 12,
                name: 'Обществознание'
            }
        ];
        this.categories = [
            {
                id: 0,
                name: 'Без категории'
            },
            {
                id: 1,
                name: 'Первая категория'
            },
            {
                id: 2,
                name: 'Высшая категория'
            }
        ];
        this.focusOnFirstField = function () { return _this.renderer.selectRootElement(_this.firstField.nativeElement).focus(); };
    }
    CreateParticipComponent.prototype.ngOnInit = function () {
        this.participForm = this.fb.group({
            surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            secondName: ['', [Validators.maxLength(25)]],
            birthday: this.fb.group({
                day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
                month: ['', [Validators.required, Validators.min(0), Validators.max(12)]],
                year: ['', [Validators.required, Validators.min(1945), Validators.max(2005)]]
            }),
            subjectCode: [{ value: 12, disabled: true }, Validators.required],
            categoryId: ['', Validators.required],
            experience: ['', Validators.required],
            phone: '',
            email: ['']
        });
        this.focusOnFirstField();
    };
    CreateParticipComponent.prototype.submitForm = function () {
        var _this = this;
        var particip = this.convertFormToModel();
        this.participService.createParticip(particip).subscribe(function () { return _this.location.back(); }, function (error) {
            if (error.status === 409) {
                alert('Учитель с такими данными уже участвовал в РСУР');
                _this.conflict.emit(particip.Surname + " " + particip.Name + " " + particip.SecondName);
            }
            else {
                throw error;
            }
        });
    };
    CreateParticipComponent.prototype.cancel = function () {
        this.location.back();
    };
    CreateParticipComponent.prototype.convertFormToModel = function () {
        var birthday = new Date(this.birthday.year.value, this.birthday.month.value, this.birthday.day.value + 1);
        return {
            Surname: this.surname.value,
            Name: this.name.value,
            SecondName: this.secondName.value,
            Birthday: birthday,
            RsurSubjectCode: this.subjectCode.value,
            CategoryId: this.categoryId.value,
            Experience: this.experience.value,
            Phone: this.phone.value,
            Email: this.email.value,
            SchoolId: this.accountService.account.UserName
        };
    };
    Object.defineProperty(CreateParticipComponent.prototype, "surname", {
        get: function () { return this.participForm.get('surname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "name", {
        get: function () { return this.participForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "secondName", {
        get: function () { return this.participForm.get('secondName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "birthday", {
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
    Object.defineProperty(CreateParticipComponent.prototype, "subjectCode", {
        get: function () { return this.participForm.get('subjectCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "categoryId", {
        get: function () { return this.participForm.get('categoryId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "experience", {
        get: function () { return this.participForm.get('experience'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "phone", {
        get: function () { return this.participForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "email", {
        get: function () { return this.participForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CreateParticipComponent.prototype, "conflict", void 0);
    __decorate([
        ViewChild('surname'),
        __metadata("design:type", ElementRef)
    ], CreateParticipComponent.prototype, "firstField", void 0);
    CreateParticipComponent = __decorate([
        Component({
            selector: 'app-create-particip',
            templateUrl: './add-particip.component.html',
            styleUrls: ['./add-particip.component.css']
        }),
        __metadata("design:paramtypes", [RsurParticipService,
            FormBuilder,
            Renderer2,
            Location,
            AccountService])
    ], CreateParticipComponent);
    return CreateParticipComponent;
}());
export { CreateParticipComponent };
//# sourceMappingURL=add-particip.component.js.map