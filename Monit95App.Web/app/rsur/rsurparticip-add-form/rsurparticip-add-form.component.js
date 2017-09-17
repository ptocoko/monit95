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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var school_service_1 = require("../../school.service");
var rsurparticip_service_1 = require("../rsurparticip.service");
var basic_validators_1 = require("../../shared/basic-validators");
var AddRsurParticip = (function () {
    function AddRsurParticip() {
    }
    return AddRsurParticip;
}());
exports.AddRsurParticip = AddRsurParticip;
var School = (function () {
    function School() {
    }
    return School;
}());
exports.School = School;
//export class Category {
//    Id: number;
//    Name: string;
//}
//export class RsurSubject {
//    Code: number;
//    Name: string;
//}
var CATEGORIES = [
    { Id: 0, Name: 'Без категории' },
    { Id: 1, Name: 'Первая категория' },
    { Id: 2, Name: 'Высшая категория' }
];
var RSURSUBJECTS = [
    { Code: 1, Name: 'Русский язык' },
    { Code: 2, Name: 'Математика' },
    { Code: 7, Name: 'История' }
];
var RsurParticipAddFormComponent = (function () {
    function RsurParticipAddFormComponent(router, route, rsurParticipService, schoolService) {
        this.router = router;
        this.route = route;
        this.rsurParticipService = rsurParticipService;
        this.schoolService = schoolService;
        this.particip = new AddRsurParticip();
        this.categories = CATEGORIES;
        this.rsurSubjects = RSURSUBJECTS;
        this.schools = [];
        this.formGroup = new forms_1.FormGroup({
            "surname": new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]),
            "name": new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]),
            "secondName": new forms_1.FormControl('', [forms_1.Validators.minLength(4), forms_1.Validators.maxLength(25)]),
            "experience": new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(60)]),
            "email": new forms_1.FormControl('', basic_validators_1.BasicValidators.emailOrEmpty),
            "phone": new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{11}')]),
            "categoryId": new forms_1.FormControl(),
            "rsurSubjectCode": new forms_1.FormControl(''),
            "birthday": new forms_1.FormControl(),
            "areaCodeWithName": new forms_1.FormControl(),
            "schoolIdFrom": new forms_1.FormControl('', this.schoolIdFromValidator())
        });
    }
    RsurParticipAddFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tempB = true;
        this.radioValue = 1;
        this.selectedSchool = '';
        this.schoolService.getAll()
            .subscribe(function (response) {
            _this.schools = response.json();
            _this.areaCodeWithNames = _this.schools.map(function (_a) {
                var AreaCodeWithName = _a.AreaCodeWithName;
                return AreaCodeWithName;
            });
            _this.areaCodeWithNames = _this.areaCodeWithNames.filter(function (el, index, array) { return array.indexOf(el) === index
                && el !== '1000 - Fake Area'; });
            _this.areaCodeWithNames.push('Неизвестно');
            _this.areaCodeWithNames.sort();
            _this.selectedArea = 'Неизвестно';
        });
    };
    RsurParticipAddFormComponent.prototype.submit = function () {
        var _this = this;
        var value = this.formGroup.value;
        var milliseconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
        value.birthday = new Date(milliseconds + 10800000);
        value.classNumbers = this.classNumbers;
        this.rsurParticipService.createParticip(value).
            subscribe(function (data) { return _this.router.navigate(['rsurparticips']); });
    };
    RsurParticipAddFormComponent.prototype.classesChange = function () {
        var _this = this;
        this.classNumbersTouched = true;
        this.classNumbers = '';
        var checkboxes = $('#classes').find(':checkbox:checked');
        checkboxes.each(function (index, element) {
            _this.classNumbers += element.id + ';';
        });
        if (this.classNumbers.length > 0) {
            this.classNumbers = this.classNumbers.slice(0, this.classNumbers.length - 1);
        }
    };
    RsurParticipAddFormComponent.prototype.schoolIdFromValidator = function () {
        var _this = this;
        return function (control) {
            var valid;
            if (_this.radioValue === 0) {
                valid = false;
            }
            //if (this.radioValue === 0 || (this.radioValue === 1 && control.value)) {
            //	valid = true;
            //}
            //else {
            //	valid = false;
            //}
            //console.log(valid);
            return valid ? null : {
                validateSchoolIdFrom: {
                    valid: false
                }
            };
        };
    };
    return RsurParticipAddFormComponent;
}());
RsurParticipAddFormComponent = __decorate([
    core_1.Component({
        selector: 'rsurparticip-add-form',
        templateUrl: './app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.html?v=${new Date().getTime()}',
        styleUrls: ['./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        rsurparticip_service_1.RsurParticipService,
        school_service_1.SchoolService])
], RsurParticipAddFormComponent);
exports.RsurParticipAddFormComponent = RsurParticipAddFormComponent;
//# sourceMappingURL=rsurparticip-add-form.component.js.map