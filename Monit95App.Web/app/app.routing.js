"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var rsurparticip_component_1 = require("./rsur/rsurparticip.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_details_component_1 = require("./rsur/details/particip-details.component");
var edit_particip_component_1 = require("./rsur/edit-particip/edit-particip.component");
var particip_correction_component_1 = require("./rsur/correction/particip-correction.component");
var class_particips_list_component_1 = require("./class-particips/class-particips-list.component");
var appRoutes = [
    { path: 'rsurparticips', component: rsurparticip_component_1.RsurParticipComponent },
    { path: 'plan', component: plan_component_1.PlanComponent },
    { path: 'result', component: result_component_1.ResultComponent },
    { path: 'details', component: particip_details_component_1.ParticipDetailsComponent },
    { path: 'edit-particip', component: edit_particip_component_1.EditParticipComponent },
    { path: 'particip-correction', component: particip_correction_component_1.ParticipCorrectionComponent },
    { path: 'class-particips', component: class_particips_list_component_1.ClassParticipsListComponent },
    { path: '', redirectTo: '/rsurparticips', pathMatch: 'full' } // redirect to home page on load
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map