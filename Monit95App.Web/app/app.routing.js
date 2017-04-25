"use strict";
var router_1 = require("@angular/router");
var particip_component_1 = require("./particip/particip.component"); //import home components
var plan_component_1 = require("./plan/plan.component"); //import about component
var appRoutes = [
    { path: 'particip', component: particip_component_1.ParticipComponent },
    { path: 'plan', component: plan_component_1.PlanComponent },
    { path: '', component: particip_component_1.ParticipComponent, pathMatch: 'full' } // redirect to home page on load
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map