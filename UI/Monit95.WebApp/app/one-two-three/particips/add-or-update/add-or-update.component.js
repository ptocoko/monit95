"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrUpdateComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particips_service_1 = require("../../../services/one-two-three/particips.service");
var router_1 = require("@angular/router");
var class_service_1 = require("../../../services/class.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
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
            console.log('whats up');
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
        console.log('whats up');
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
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]],
            secondName: ['', forms_1.Validators.minLength(4)],
            classId: ['', forms_1.Validators.required]
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
            console.log('whats up');
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "name", {
        get: function () { return this.participForm.get('name'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "secondName", {
        get: function () { return this.participForm.get('secondName'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddOrUpdateComponent.prototype, "classId", {
        get: function () { return this.participForm.get('classId'); },
        enumerable: false,
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
    tslib_1.__decorate([
        (0, core_1.ViewChild)('surnameInput'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], AddOrUpdateComponent.prototype, "firstField", void 0);
    AddOrUpdateComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=".concat(new Date().getTime())]
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