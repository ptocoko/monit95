"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_component_1 = require("./profile/profile.component");
var shared_module_1 = require("../../shared/shared-module");
var schools_profile_service_1 = require("../../services/schools-profile/schools-profile.service");
var material_module_1 = require("../../material.module");
var common_1 = require("@angular/common");
var routes = [
    { path: 'schools-profile', component: profile_component_1.ProfileComponent }
];
var SchoolsProfileModule = /** @class */ (function () {
    function SchoolsProfileModule() {
    }
    SchoolsProfileModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_module_1.SharedModule, material_module_1.MaterialModule, router_1.RouterModule.forChild(routes)],
            declarations: [profile_component_1.ProfileComponent],
            providers: [schools_profile_service_1.SchoolsProfileService]
        })
    ], SchoolsProfileModule);
    return SchoolsProfileModule;
}());
exports.SchoolsProfileModule = SchoolsProfileModule;
//# sourceMappingURL=schools-profile.module.js.map