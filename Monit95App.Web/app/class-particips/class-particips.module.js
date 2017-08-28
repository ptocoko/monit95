"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var class_particips_list_component_1 = require("./class-particips-list.component");
var class_particips_routing_1 = require("./class-particips.routing");
var common_1 = require("@angular/common");
var export_excel_modal_component_1 = require("./export-excel-modal.component");
var add_class_particip_modal_1 = require("./add-class-particip.modal");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var ClassParticipsModule = (function () {
    function ClassParticipsModule() {
    }
    return ClassParticipsModule;
}());
ClassParticipsModule = __decorate([
    core_1.NgModule({
        declarations: [
            class_particips_list_component_1.ClassParticipsListComponent,
            export_excel_modal_component_1.ExportExcelModal,
            add_class_particip_modal_1.AddClassParticipModal
        ],
        imports: [http_1.HttpModule, forms_1.FormsModule, common_1.CommonModule, class_particips_routing_1.ClassParticipsRoutingModule],
        entryComponents: [export_excel_modal_component_1.ExportExcelModal, add_class_particip_modal_1.AddClassParticipModal]
    })
], ClassParticipsModule);
exports.ClassParticipsModule = ClassParticipsModule;
//# sourceMappingURL=class-particips.module.js.map