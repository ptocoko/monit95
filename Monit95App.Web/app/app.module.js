"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var particips_component_1 = require("./particips/particips.component");
var particip_list_component_1 = require("./particips/particip-list.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_details_component_1 = require("./particips/particip-details.component");
var particip_modal_component_1 = require("./particips/particip-modal.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var particip_filter_pipe_1 = require("./particips/particip-filter.pipe");
var user_service_1 = require("./user.service");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_1.routing, forms_1.FormsModule, ng2_bs3_modal_1.Ng2Bs3ModalModule],
        declarations: [app_component_1.AppComponent, particips_component_1.ParticipsComponent, particip_list_component_1.ParticipListComponent, particip_filter_pipe_1.ParticipFilterPipe, plan_component_1.PlanComponent, result_component_1.ResultComponent, particip_details_component_1.ParticipDetailsComponent, particip_modal_component_1.NgbdModalContent],
        providers: [user_service_1.UserService, {
                provide: common_1.LocationStrategy,
                useClass: common_1.HashLocationStrategy
            }],
        entryComponents: [particip_modal_component_1.NgbdModalContent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map