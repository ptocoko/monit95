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
var marks_service_1 = require("../../rsur/marks/marks.service");
var MarksAddAndEditModel = (function () {
    function MarksAddAndEditModel() {
    }
    return MarksAddAndEditModel;
}());
exports.MarksAddAndEditModel = MarksAddAndEditModel;
var MarksAddAndEditComponent = (function () {
    function MarksAddAndEditComponent(router, activatedRoute, marksService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.marksService = marksService;
        this.marksAddAndEditModel = new MarksAddAndEditModel();
        this.formGroup = new forms_1.FormGroup({
            "question1Mark": new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('^(0|0.5|0,5|1|1.5|1,5|2|2.5|2,5|3|3.5|3,5|4)$')]),
            "question2Mark": new forms_1.FormControl('', [forms_1.Validators.pattern('^(0|0.5|0,5|1)$'), forms_1.Validators.required]),
            "question3Mark": new forms_1.FormControl('', [forms_1.Validators.pattern('^(0|1|2|3)$'), forms_1.Validators.required]),
            "question4Mark": new forms_1.FormControl('', [forms_1.Validators.pattern('^(0|0.5|0,5|1)$'), forms_1.Validators.required]),
            "question5Mark": new forms_1.FormControl('', [forms_1.Validators.pattern('^(0|1)$'), forms_1.Validators.required])
        });
    }
    MarksAddAndEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.participTestId = params['participTestId'];
            _this.marksService.getMarksByParticipTestId(_this.participTestId).subscribe(function (marksAddAndEditModel) {
                _this.marksAddAndEditModel = marksAddAndEditModel.json();
                _this.isUpdate = _this.marksAddAndEditModel.Question1Mark != null;
            });
        });
    };
    MarksAddAndEditComponent.prototype.submit = function () {
        var marksString = this.marksAddAndEditModel.Question1Mark.replace(',', '.') + "; " + this.marksAddAndEditModel.Question2Mark.replace(',', '.') + "; " + this.marksAddAndEditModel.Question3Mark.replace(',', '.') + "; " + this.marksAddAndEditModel.Question4Mark.replace(',', '.') + "; " + this.marksAddAndEditModel.Question5Mark.replace(',', '.');
        var marksDto = {
            participTestId: this.participTestId,
            marks: marksString
        };
        if (this.isUpdate) {
            this.marksService.updateMarks(marksDto);
            this.router.navigate(['/class-particips/marks']);
        }
        else {
            this.marksService.addMarks(marksDto);
            this.router.navigate(['/class-particips/marks']);
        }
    };
    MarksAddAndEditComponent.prototype.back = function () {
        this.router.navigate(['/class-particips/marks']);
    };
    return MarksAddAndEditComponent;
}());
MarksAddAndEditComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/marks/marks-add-and-edit.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        marks_service_1.MarksService])
], MarksAddAndEditComponent);
exports.MarksAddAndEditComponent = MarksAddAndEditComponent;
//# sourceMappingURL=marks-add-and-edit.component.js.map