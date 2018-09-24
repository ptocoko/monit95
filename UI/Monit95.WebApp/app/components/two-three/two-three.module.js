"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../../shared/shared-module");
var material_module_1 = require("../../material.module");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var http_1 = require("@angular/common/http");
var routes = [
    { path: 'two-three/home', component: home_component_1.HomeComponent },
    { path: 'two-three', redirectTo: 'two-three/home', pathMatch: 'full' }
];
var TwoThreeModule = /** @class */ (function () {
    function TwoThreeModule() {
    }
    TwoThreeModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule],
            declarations: [home_component_1.HomeComponent]
        })
    ], TwoThreeModule);
    return TwoThreeModule;
}());
exports.TwoThreeModule = TwoThreeModule;
//# sourceMappingURL=two-three.module.js.map