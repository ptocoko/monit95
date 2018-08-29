"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var class_service_1 = require("../../../../services/class.service");
var particips_service_1 = require("../../../../services/first-class/particips.service");
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
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            secondName: ['', forms_1.Validators.minLength(5)],
            birthday: this.fb.group({
                day: ['', [forms_1.Validators.required, forms_1.Validators.min(1), forms_1.Validators.max(31)]],
                month: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(12)]],
                year: ['', [forms_1.Validators.required, forms_1.Validators.min(2009), forms_1.Validators.max(2014)]]
            }),
            classId: ['', forms_1.Validators.required],
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
    AddOrUpdateComponent.prototype.submitForm = function () {
        if (this.participForm.invalid) {
            this.markFieldsAsDirty();
        }
        else if (this.participForm.pristine) {
            this.formIsPristine = true;
        }
        else {
            if (this.isUpdate) {
                //this.participService.update(this.particip).subscribe(() => this.location.back());
                this.putParticip(this.convertParticip());
            }
            else {
                //this.participService.post(this.particip).subscribe(() => this.location.back());
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
                //this.participService.post(this.particip)
                //		.subscribe();
                this.postParticip(this.convertParticip(), function () {
                    _this.participForm.enable();
                    _this.isLoading = false;
                    _this.particip = {};
                    _this.participForm.reset();
                    _this.participForm.patchValue({ wasDoo: false });
                    _this.focusOnFirstField();
                });
            }
        }
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
    tslib_1.__decorate([
        core_1.ViewChild('surnameInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], AddOrUpdateComponent.prototype, "firstField", void 0);
    AddOrUpdateComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/particips/add-or-update/add-or-update.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/first-class/particips/add-or-update/add-or-update.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService,
            class_service_1.ClassService,
            router_1.Router,
            router_1.ActivatedRoute,
            common_1.Location,
            forms_1.FormBuilder,
            core_1.Renderer2])
    ], AddOrUpdateComponent);
    return AddOrUpdateComponent;
}());
exports.AddOrUpdateComponent = AddOrUpdateComponent;
//# sourceMappingURL=add-or-update.component.js.map