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
var rsurparticip_1 = require("../rsurparticip");
var rsurparticip_service_1 = require("../rsurparticip.service");
var basic_validators_1 = require("../../shared/basic-validators");
var RsurParticipAddFormComponent = (function () {
    function RsurParticipAddFormComponent(router, route, rsurParticipService) {
        this.router = router;
        this.route = route;
        this.rsurParticipService = rsurParticipService;
        this.particip = new rsurparticip_1.RsurParticip();
        this.formGroup = new forms_1.FormGroup({
            "surname": new forms_1.FormControl("", forms_1.Validators.required),
            "name": new forms_1.FormControl("", forms_1.Validators.required),
            "secondName": new forms_1.FormControl("", forms_1.Validators.minLength(3)),
            "experience": new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.max(60)]),
            "email": new forms_1.FormControl("", [
                forms_1.Validators.required,
                basic_validators_1.BasicValidators.email
            ]),
            "phone": new forms_1.FormControl("", forms_1.Validators.pattern("[0-9]{11}"))
        });
        //this.form = formBuilder.group({
        //    surname: ['', [
        //        Validators.required,
        //        Validators.minLength(3)
        //    ]],
        //    name: ['', [
        //        Validators.required,
        //        Validators.minLength(3)
        //    ]],
        //    secondName: ['', [                
        //        Validators.minLength(3)
        //    ]],
        //    categoryId: ['', [
        //        Validators.required,
        //        Validators.minLength(3)
        //    ]],
        //    experience: ['', [
        //        Validators.required                
        //    ]],
        //    email: ['', [
        //        Validators.required,
        //        BasicValidators.email
        //        //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        //    ]],
        //    phone: ['', [
        //        Validators.required,
        //        Validators.pattern('[0-9]')
        //    ]],
        //    rsurSubjectCode: ['', [
        //        Validators.required                
        //    ]],
        //    birthday: ['', [
        //        Validators.required
        //    ]],
        //    classNumbers: ['', [
        //        Validators.required
        //    ]],
        //    schoolIdFrom: ['', [                
        //    ]],
        //});
    }
    RsurParticipAddFormComponent.prototype.ngOnInit = function () {
        //var id = this.route.params.subscribe(params => {
        //    var id = params['id'];
        //    this.title = id ? 'Edit User' : 'New User';
        //    if (!id)
        //        return;
        //    this.usersService.getUser(id)
        //        .subscribe(
        //        user => this.user = user,
        //        response => {
        //            if (response.status == 404) {
        //                this.router.navigate(['NotFound']);
        //            }
        //        });
        //});
    };
    RsurParticipAddFormComponent.prototype.save = function () {
        var _this = this;
        this.rsurParticipService.createParticip(this.formGroup.value).
            subscribe(function (data) { return _this.router.navigate(['rsurparticips']); });
        //var result,
        //    userValue = this.form.value;
        //if (userValue.id) {
        //    result = this.usersService.updateUser(userValue);
        //} else {
        //    result = this.usersService.addUser(userValue);
        //}
        //result.subscribe(data => this.router.navigate(['users']));
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
        rsurparticip_service_1.RsurParticipService])
], RsurParticipAddFormComponent);
exports.RsurParticipAddFormComponent = RsurParticipAddFormComponent;
//# sourceMappingURL=rsurparticip-add-form.component.js.map