"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParticipComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var account_service_1 = require("../../../../../services/account.service");
var CreateParticipComponent = /** @class */ (function () {
    function CreateParticipComponent(participService, fb, renderer, location, accountService) {
        var _this = this;
        this.participService = participService;
        this.fb = fb;
        this.renderer = renderer;
        this.location = location;
        this.accountService = accountService;
        this.conflict = new core_1.EventEmitter();
        this.monthDays = tslib_1.__spreadArray([], Array.from({ length: 32 }, function (val, key) { return key; }).splice(1), true);
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
        this.years = tslib_1.__spreadArray([], Array.from({ length: 60 }, function (val, key) { return key + 1945; }), true);
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
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(25)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2), forms_1.Validators.maxLength(25)]],
            secondName: ['', [forms_1.Validators.maxLength(25)]],
            birthday: this.fb.group({
                day: ['', [forms_1.Validators.required, forms_1.Validators.min(1), forms_1.Validators.max(31)]],
                month: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(12)]],
                year: ['', [forms_1.Validators.required, forms_1.Validators.min(1945), forms_1.Validators.max(2005)]]
            }),
            subjectCode: [{ value: 12, disabled: true }, forms_1.Validators.required],
            categoryId: ['', forms_1.Validators.required],
            experience: ['', forms_1.Validators.required],
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
                _this.conflict.emit("".concat(particip.Surname, " ").concat(particip.Name, " ").concat(particip.SecondName));
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "name", {
        get: function () { return this.participForm.get('name'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "secondName", {
        get: function () { return this.participForm.get('secondName'); },
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "subjectCode", {
        get: function () { return this.participForm.get('subjectCode'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "categoryId", {
        get: function () { return this.participForm.get('categoryId'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "experience", {
        get: function () { return this.participForm.get('experience'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "phone", {
        get: function () { return this.participForm.get('phone'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateParticipComponent.prototype, "email", {
        get: function () { return this.participForm.get('email'); },
        enumerable: false,
        configurable: true
    });
    tslib_1.__decorate([
        (0, core_1.Output)(),
        tslib_1.__metadata("design:type", Object)
    ], CreateParticipComponent.prototype, "conflict", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)('surname'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], CreateParticipComponent.prototype, "firstField", void 0);
    CreateParticipComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'app-create-particip',
            templateUrl: "./app/components/rsur/actualization/hiring/add/add-particip.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/actualization/hiring/add/add-particip.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            forms_1.FormBuilder,
            core_1.Renderer2,
            common_1.Location,
            account_service_1.AccountService])
    ], CreateParticipComponent);
    return CreateParticipComponent;
}());
exports.CreateParticipComponent = CreateParticipComponent;
//# sourceMappingURL=add-particip.component.js.map