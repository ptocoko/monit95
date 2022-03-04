"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersCertModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
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
        (0, core_1.NgModule)({
            imports: [router_1.RouterModule.forChild(routes)],
            declarations: [home_component_1.HomeComponent]
        })
    ], TeachersCertModule);
    return TeachersCertModule;
}());
exports.TeachersCertModule = TeachersCertModule;
//# sourceMappingURL=teachers-cert.module.js.map