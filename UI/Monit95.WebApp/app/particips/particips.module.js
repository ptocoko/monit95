"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var particips_list_component_1 = require("./particips-list.component");
var particip_service_1 = require("../services/particip.service");
var routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: particips_list_component_1.ParticipsListComponent }
];
var ParticipsModule = /** @class */ (function () {
    function ParticipsModule() {
    }
    ParticipsModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                particips_list_component_1.ParticipsListComponent
            ],
            providers: [
                particip_service_1.ParticipService
            ]
        })
    ], ParticipsModule);
    return ParticipsModule;
}());
exports.ParticipsModule = ParticipsModule;
//# sourceMappingURL=particips.module.js.map