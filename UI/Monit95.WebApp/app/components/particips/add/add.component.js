"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var particip_model_1 = require("../../../models/particip.model");
var particips_service_1 = require("../../../services/refactored/particips.service");
var account_service_1 = require("../../../services/account.service");
var router_1 = require("@angular/router");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var CLASSES = [
    {
        Id: '0900',
        Name: '9'
    },
    {
        Id: '1100',
        Name: '11'
    }
];
var Field;
(function (Field) {
    Field["Surname"] = "Surname";
    Field["Name"] = "Name";
    Field["SecondName"] = "SecondName";
    Field["Class"] = "Class";
    Field["Birthday"] = "Birthday";
    Field["DocumNum"] = "DocumNum";
})(Field || (Field = {}));
var AddComponent = /** @class */ (function () {
    function AddComponent(participsService, accountService, location, route) {
        this.participsService = participsService;
        this.accountService = accountService;
        this.location = location;
        this.route = route;
        this.fieldTypes = Field;
        this.particip = new particip_model_1.ParticipModel();
        this.availableClasses = [];
        this.isSending = false;
        this.isConflict = false;
        this.days = Array.from({ length: 31 }).map(function (_, i) { return ++i; });
        this.months = Array.from({ length: 12 }).map(function (_, i) {
            var name = new Intl.DateTimeFormat('ru', { month: 'long' }).format(new Date(2021, i, 1));
            return { id: i, name: "".concat(name[0].toUpperCase()).concat(name.slice(1)) };
        });
    }
    AddComponent.prototype.ngOnInit = function () {
        this.projectId = +this.route.snapshot.queryParams['projectId'];
        this.projectName = this.route.snapshot.queryParams['projectName'];
        if (this.route.snapshot.queryParamMap.has('classNumber')) {
            this.classNumber = +this.route.snapshot.queryParamMap.get('classNumber');
        }
        switch (this.projectId) {
            case 35:
                this.availableClasses = [
                    //	{ Id: '0200', Name: '2' },
                    { Id: '0500', Name: '5' },
                    { Id: '0600', Name: '6' },
                    { Id: '1000', Name: '10' },
                ];
                this.formFields = [
                    { type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
                    { type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
                    { type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
                    { type: Field.Class, required: false, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
                ];
                break;
            case 36:
                this.availableClasses = [
                    { Id: '0200', Name: '2' }
                ];
                this.formFields = [
                    { type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
                    { type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
                    { type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
                    { type: Field.Class, required: false, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
                ];
                break;
            case 39:
                if (this.classNumber === 8) {
                    this.availableClasses = [
                        { Id: '0801', Name: '8 А' },
                        { Id: '0802', Name: '8 Б' },
                        { Id: '0803', Name: '8 В' },
                        { Id: '0804', Name: '8 Г' },
                        { Id: '0805', Name: '8 Д' },
                        { Id: '0806', Name: '8 Е' },
                        { Id: '0807', Name: '8 Ж' },
                        { Id: '0808', Name: '8 З' },
                        { Id: '0809', Name: '8 И' },
                        { Id: '0810', Name: '8 К' },
                        { Id: '0811', Name: '8 Л' }
                    ];
                }
                else if (this.classNumber === 9) {
                    this.availableClasses = [
                        { Id: '0901', Name: '9 A' },
                        { Id: '0902', Name: '9 Б' },
                        { Id: '0903', Name: '9 В' },
                        { Id: '0904', Name: '9 Г' },
                        { Id: '0905', Name: '9 Д' },
                        { Id: '0906', Name: '9 Е' },
                        { Id: '0907', Name: '9 Ж' },
                        { Id: '0908', Name: '9 З' },
                        { Id: '0909', Name: '9 И' },
                        { Id: '0910', Name: '9 К' },
                        { Id: '0911', Name: '9 Л' }
                    ];
                }
                this.formFields = [
                    { type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
                    { type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
                    { type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
                    { type: Field.Class, required: true, minLength: 1, maxLength: 25, invalidMsg: 'выберите класс.', availableClasses: this.availableClasses },
                    { type: Field.Birthday, required: true, years: this.getYears(2000, 2015) },
                    { type: Field.DocumNum, required: true, minLength: 1, maxLength: 25 }
                ];
                break;
            case 41:
                this.formFields = [
                    { type: Field.Surname, required: true, minLength: 1, maxLength: 25, invalidMsg: 'фамилия должна содержать до 25 букв.' },
                    { type: Field.Name, required: true, minLength: 1, maxLength: 25, invalidMsg: 'имя должно содержать до 25 букв.' },
                    { type: Field.SecondName, required: false, minLength: 1, maxLength: 25, invalidMsg: 'отчество должно содержать до 25 букв.' },
                    { type: Field.Birthday, required: true, years: this.getYears(1995, 2015) },
                ];
            default:
                throw new Error('Форма не подготовлена для указанного проекта.');
        }
        // this.availableClasses = CLASSES;
        if (this.availableClasses.length === 1) {
            this.particip.ClassId = this.availableClasses[0].Id;
        }
    };
    AddComponent.prototype.onSubmit = function () {
        var _this = this;
        this.postParticip().subscribe(function (_) {
            _this.back();
        }, function (error) {
            _this.isSending = false;
            if (error.status === 409) {
                _this.isConflict = true;
            }
            else {
                throw error;
            }
        });
    };
    AddComponent.prototype.addNext = function () {
        var _this = this;
        this.postParticip().subscribe(function (_) {
            _this.isSending = false;
            var currentClassId = _this.particip.ClassId;
            _this.addSuccessText = "\u0423\u0447\u0435\u043D\u0438\u043A '".concat(_this.particip.Surname, " ").concat(_this.particip.Name, " ").concat(_this.particip.SecondName, "' \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0441\u043F\u0438\u0441\u043E\u043A!");
            _this.registerAddSuccessTextFading();
            _this.particip = new particip_model_1.ParticipModel();
            _this.clearBirthday();
            _this.particip.ClassId = currentClassId;
            var firstInput = document.querySelector('#newParticipForm input');
            firstInput.focus();
        }, function (error) {
            _this.isSending = false;
            if (error.status === 409) {
                _this.isConflict = true;
            }
            else {
                throw error;
            }
        });
    };
    AddComponent.prototype.back = function () {
        this.location.back();
    };
    AddComponent.prototype.postParticip = function () {
        this.isSending = true;
        this.isConflict = false;
        this.trimParticipFields();
        this.applyBirthday();
        if (this.projectId === 41) {
            this.particip.ClassId = "".concat(this.classNumber.toString().length === 2 ? '' : '0').concat(this.classNumber, "00");
        }
        return this.participsService.post(this.particip, this.projectId);
    };
    AddComponent.prototype.trimParticipFields = function () {
        // избавляемся от пробелов в начале и в конце
        this.particip.Surname = this.particip.Surname.trim();
        this.particip.Name = this.particip.Name.trim();
        if (this.particip.SecondName) {
            this.particip.SecondName = this.particip.SecondName.trim();
        }
        ;
    };
    AddComponent.prototype.registerAddSuccessTextFading = function () {
        var _this = this;
        var form = document.querySelector('#newParticipForm');
        var sub = (0, fromEvent_1.fromEvent)(form, 'input').subscribe(function () {
            _this.addSuccessText = '';
            sub.unsubscribe();
        });
    };
    AddComponent.prototype.getYears = function (min, max) {
        var arr = [];
        for (var i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    };
    AddComponent.prototype.applyBirthday = function () {
        if (this.formFields.filter(function (ff) { return ff.type === Field.Birthday; }).length) {
            this.particip.Birthday = new Date(this.participYear, this.participMonth, this.participDay, 12);
        }
    };
    AddComponent.prototype.clearBirthday = function () {
        this.participDay = null;
        this.participMonth = null;
        this.participYear = null;
    };
    AddComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/particips/add/add.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/particips/add/add.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipsService,
            account_service_1.AccountService,
            common_1.Location,
            router_1.ActivatedRoute])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map