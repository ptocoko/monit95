"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_module_1 = require("../material.module");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared-module");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var particips_list_component_1 = require("./particips/list/particips-list.component");
var particips_service_1 = require("../services/one-two-three/particips.service");
var particips_pipe_1 = require("../pipes/one-two-three/particips.pipe");
var routes = [
    { path: 'one-two-three/home', component: home_component_1.HomeComponent },
    { path: 'one-two-three/particips/list', component: particips_list_component_1.ParticipsListComponent },
    { path: 'one-two-three', redirectTo: 'one-two-three/home', pathMatch: 'full' }
];
var OneTwoThreeModule = /** @class */ (function () {
    function OneTwoThreeModule() {
    }
    OneTwoThreeModule = tslib_1.__decorate([
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
            exports: [router_1.RouterModule],
            declarations: [
                home_component_1.HomeComponent,
                particips_list_component_1.ParticipsListComponent,
                particips_pipe_1.ClassFilterPipe,
                particips_pipe_1.ClassesGetterPipe,
                particips_pipe_1.ParticipFilterPipe
            ],
            providers: [
                particips_service_1.ParticipService
            ]
        })
    ], OneTwoThreeModule);
    return OneTwoThreeModule;
}());
exports.OneTwoThreeModule = OneTwoThreeModule;
//# sourceMappingURL=one-two-three.module.js.map