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
var user_service_1 = require("../user.service");
var particip_service_1 = require("../particips/particip.service");
var angular2_modal_1 = require("angular2-modal");
var export_excel_modal_component_1 = require("./export-excel-modal.component");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var add_class_particip_modal_1 = require("./add-class-particip.modal");
var ClassParticipsListComponent = (function () {
    function ClassParticipsListComponent(userService, participService, modal) {
        this.userService = userService;
        this.participService = participService;
        this.modal = modal;
    }
    ClassParticipsListComponent.prototype.ngOnInit = function () {
        this.userService.getAccount().subscribe(function (data) {
            var user = data.json();
            //TODO: Get first class particips
        });
        this.classParticips = new Array();
    };
    ClassParticipsListComponent.prototype.exportParticips = function (event) {
        var file = event.target.files[0];
        if (file.name.split('.').pop() === 'xlsx') {
            this.modal.open(export_excel_modal_component_1.ExportExcelModal, angular2_modal_1.overlayConfigFactory({ file: file }, bootstrap_1.BSModalContext)).then(function (modal) {
                modal.result.then(function (result) {
                    //TODO: realize update list of particips;
                }).catch(function (data) {
                    //console.log(data);
                });
            });
        }
    };
    ClassParticipsListComponent.prototype.addClassParticip = function () {
        var _this = this;
        this.modal.open(add_class_particip_modal_1.AddClassParticipModal, angular2_modal_1.overlayConfigFactory({ isUpdate: false }, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (classParticip) {
                if (classParticip) {
                    _this.classParticips.push(classParticip);
                    console.log(_this.classParticips);
                }
            });
        });
    };
    ClassParticipsListComponent.prototype.updateClassParticip = function (classParticip, index) {
        var _this = this;
        this.modal.open(add_class_particip_modal_1.AddClassParticipModal, angular2_modal_1.overlayConfigFactory({ isUpdate: true, particip: classParticip }, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (particip) {
                if (particip) {
                    console.log(particip);
                    _this.classParticips[index] = particip;
                    console.log(_this.classParticips[index]);
                }
            });
        });
    };
    return ClassParticipsListComponent;
}());
ClassParticipsListComponent = __decorate([
    core_1.Component({
        templateUrl: './app/class-particips/class-particips-list.component.html',
        styles: [
            ".fileUploader {\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: relative;\n\t\t\t}\n\n\t\t\t.fileUploader [type=file] {\n\t\t\t\tcursor: inherit;\n\t\t\t\tdisplay: block;\n\t\t\t\tfont-size: 999px;\n\t\t\t\tfilter: alpha(opacity=0);\n\t\t\t\tmin-height: 100%;\n\t\t\t\tmin-width: 100%;\n\t\t\t\topacity: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\ttext-align: right;\n\t\t\t\ttop: 0;\n\t\t\t}"
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, particip_service_1.ParticipService, angular2_modal_1.Modal])
], ClassParticipsListComponent);
exports.ClassParticipsListComponent = ClassParticipsListComponent;
//# sourceMappingURL=class-particips-list.component.js.map