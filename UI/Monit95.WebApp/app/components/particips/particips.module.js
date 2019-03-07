"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../../material.module");
var shared_module_1 = require("../../shared/shared-module");
var particips_service_1 = require("../../services/refactored/particips.service");
var list_component_1 = require("./list/list.component");
var add_component_1 = require("./add/add.component");
var routes = [
    //{ path: 'particips/home', component: HomeComponent },
    { path: 'particips2/list', component: list_component_1.ListComponent },
    { path: 'particips2/new', component: add_component_1.AddComponent },
];
var ParticipsModule2 = /** @class */ (function () {
    function ParticipsModule2() {
    }
    ParticipsModule2 = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                list_component_1.ListComponent,
                add_component_1.AddComponent
            ],
            providers: [
                particips_service_1.ParticipsService
            ]
        })
    ], ParticipsModule2);
    return ParticipsModule2;
}());
exports.ParticipsModule2 = ParticipsModule2;
//# sourceMappingURL=particips.module.js.map