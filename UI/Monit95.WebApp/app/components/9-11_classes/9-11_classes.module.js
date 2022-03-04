"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DamnClassesModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var home_component_1 = require("./home/home.component");
var router_1 = require("@angular/router");
var routes = [
    { path: '9-11_classes/home', component: home_component_1.HomeComponent }
];
var DamnClassesModule = /** @class */ (function () {
    function DamnClassesModule() {
    }
    DamnClassesModule = tslib_1.__decorate([
        (0, core_1.NgModule)({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [home_component_1.HomeComponent]
        })
    ], DamnClassesModule);
    return DamnClassesModule;
}());
exports.DamnClassesModule = DamnClassesModule;
//# sourceMappingURL=9-11_classes.module.js.map