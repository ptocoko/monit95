"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipsModule2 = void 0;
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
var home_component_1 = require("./home/home.component");
var PROJECT_ID = 35;
var PROJECT_NAME = 'Я сдам EГЭ!';
var data = { projectId: PROJECT_ID, projectName: PROJECT_NAME };
var routes = [
    { path: 'particips2/home', component: home_component_1.HomeComponent },
    { path: 'particips2/list', component: list_component_1.ListComponent },
    { path: 'particips2/new', component: add_component_1.AddComponent },
    //{ path: 'particips2', redirectTo: 'particips/home', pathMatch: 'full' },
];
var ParticipsModule2 = /** @class */ (function () {
    function ParticipsModule2() {
    }
    ParticipsModule2 = tslib_1.__decorate([
        (0, core_1.NgModule)({
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
                add_component_1.AddComponent,
                home_component_1.HomeComponent
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