"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particips_service_1 = require("../../../services/one-two-three/particips.service");
var router_1 = require("@angular/router");
var class_service_1 = require("../../../services/class.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AddOrUpdateComponent = /** @class */ (function () {
    function AddOrUpdateComponent(participService, classService, router, route, location, fb) {
        this.participService = participService;
        this.classService = classService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.fb = fb;
        this.isUpdate = true;
    }
    AddOrUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.isUpdate = params['participId'];
            if (_this.isUpdate) {
                _this.participService.get(params['participId']).subscribe(function (res) {
                    _this.particip = res;
                    _this.createForm();
                });
            }
            else {
                _this.particip = {};
                _this.createForm();
            }
            _this.classService.getClasses().subscribe(function (res) { return _this.classes = res.slice(0, 36); });
        });
    };
    AddOrUpdateComponent.prototype.createForm = function () {
        this.participForm = this.fb.group({
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            secondName: ['', forms_1.Validators.minLength(5)],
            classId: ['', forms_1.Validators.required]
        });
    };
    AddOrUpdateComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.participForm.invalid) {
            for (var _i = 0, _a = Object.keys(this.participForm.controls); _i < _a.length; _i++) {
                var control = _a[_i];
                this.participForm.get(control).markAsTouched();
            }
        }
        else {
            this.isUpdate ? this.participService.update(this.particip).subscribe(function () { return _this.location.back(); })
                : this.participService.post(this.particip).subscribe(function () { return _this.location.back(); });
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
    AddOrUpdateComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService,
            class_service_1.ClassService,
            router_1.Router,
            router_1.ActivatedRoute,
            common_1.Location,
            forms_1.FormBuilder])
    ], AddOrUpdateComponent);
    return AddOrUpdateComponent;
}());
exports.AddOrUpdateComponent = AddOrUpdateComponent;
//# sourceMappingURL=add-or-update.component.js.map