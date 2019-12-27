"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var home_component_1 = require("./home/home.component");
var shared_module_1 = require("../../shared/shared-module");
var router_1 = require("@angular/router");
var routes = [
    { path: 'kpk/home', component: home_component_1.HomeComponent }
];
var KpkModule = /** @class */ (function () {
    function KpkModule() {
    }
    KpkModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(routes)],
            declarations: [home_component_1.HomeComponent]
        })
    ], KpkModule);
    return KpkModule;
}());
exports.KpkModule = KpkModule;
//# sourceMappingURL=kpk.module.js.map