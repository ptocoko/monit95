"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoThreeModule2 = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../../shared/shared-module");
var material_module_1 = require("../../material.module");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var http_1 = require("@angular/common/http");
var routes = [
    { path: 'two-three-2/home', component: home_component_1.HomeComponent },
    { path: 'two-three-2', redirectTo: 'two-three-2/home', pathMatch: 'full' }
];
var TwoThreeModule2 = /** @class */ (function () {
    function TwoThreeModule2() {
    }
    TwoThreeModule2 = tslib_1.__decorate([
        (0, core_1.NgModule)({
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
    ], TwoThreeModule2);
    return TwoThreeModule2;
}());
exports.TwoThreeModule2 = TwoThreeModule2;
//# sourceMappingURL=two-three.module.js.map