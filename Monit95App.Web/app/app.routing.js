"use strict";
var router_1 = require("@angular/router");
var particips_component_1 = require("./particips/particips.component");
//import { ParticipListComponent } from './particips/particip-list.component';
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var appRoutes = [
    { path: 'particips', component: particips_component_1.ParticipsComponent },
    { path: 'plan', component: plan_component_1.PlanComponent },
    { path: 'result', component: result_component_1.ResultComponent },
    { path: '', component: particips_component_1.ParticipsComponent, pathMatch: 'full' } // redirect to home page on load
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map