"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var particips_list_component_1 = require("./particips/list/particips-list.component");
var add_or_update_component_1 = require("./particips/add-or-update/add-or-update.component");
var shared_module_1 = require("../../shared/shared-module");
var material_module_1 = require("../../material.module");
var particips_service_1 = require("../../services/first-class/particips.service");
var protocols_service_1 = require("../../services/first-class/protocols.service");
var protocols_list_component_1 = require("./protocols/list/protocols-list.component");
var routes = [
    { path: 'first-class/home', component: home_component_1.HomeComponent },
    { path: 'first-class/particips/list', component: particips_list_component_1.ParticipsListComponent },
    { path: 'first-class/particips/add', component: add_or_update_component_1.AddOrUpdateComponent },
    { path: 'first-class/particips/:participId', component: add_or_update_component_1.AddOrUpdateComponent },
    { path: 'first-class/protocols/list', component: protocols_list_component_1.ProtocolsListComponent },
    { path: 'first-class', redirectTo: 'first-class/home', pathMatch: 'full' }
];
var FirstClassModule = /** @class */ (function () {
    function FirstClassModule() {
    }
    FirstClassModule = tslib_1.__decorate([
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
                add_or_update_component_1.AddOrUpdateComponent,
                protocols_list_component_1.ProtocolsListComponent
            ],
            providers: [
                particips_service_1.ParticipService,
                protocols_service_1.ProtocolsService
            ]
        })
    ], FirstClassModule);
    return FirstClassModule;
}());
exports.FirstClassModule = FirstClassModule;
//# sourceMappingURL=first-class.module.js.map