"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var home_component_1 = require("../../particips/home/home.component");
var router_1 = require("@angular/router");
var routes = [
    {
        path: 'teachers-cert/home',
        component: home_component_1.HomeComponent
    }
];
var TeachersCertModule = /** @class */ (function () {
    function TeachersCertModule() {
    }
    TeachersCertModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            declarations: [home_component_1.HomeComponent]
        })
    ], TeachersCertModule);
    return TeachersCertModule;
}());
exports.TeachersCertModule = TeachersCertModule;
//# sourceMappingURL=teachers-cert.module.js.map