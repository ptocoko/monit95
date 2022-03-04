"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VprModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var shared_module_1 = require("../../shared/shared-module");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../../material.module");
var home_component_1 = require("./home/home.component");
var vpr_service_1 = require("../../services/vpr.service");
var stats_component_1 = require("./statistics/stats.component");
var class_selector_component_1 = require("./class-selector/class-selector.component");
var routes = [
    { path: 'vpr/home', component: home_component_1.HomeComponent },
    { path: 'vpr/stats', component: stats_component_1.StatsComponent }
];
var VprModule = /** @class */ (function () {
    function VprModule() {
    }
    VprModule = tslib_1.__decorate([
        (0, core_1.NgModule)({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                stats_component_1.StatsComponent,
                class_selector_component_1.ClassSelectorComponent,
            ],
            providers: [vpr_service_1.VprService]
        })
    ], VprModule);
    return VprModule;
}());
exports.VprModule = VprModule;
//# sourceMappingURL=vpr.module.js.map