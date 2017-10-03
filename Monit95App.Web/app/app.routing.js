"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var rsur_particips_component_1 = require("./rsur/rsur-particips/rsur-particips.component");
var rsurparticip_add_form_component_1 = require("./rsur/rsurparticip-add-form/rsurparticip-add-form.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_details_component_1 = require("./rsur/details/particip-details.component");
var particip_correction_component_1 = require("./rsur/correction/particip-correction.component");
var class_particips_list_component_1 = require("./class-particips/class-particips-list.component");
var marks_component_1 = require("./class-particips/marks/marks.component");
var export_excel_component_1 = require("./class-particips/excel-export/export-excel.component");
var class_particips_plan_component_1 = require("./class-particips/class-particips-plan.component");
var add_component_1 = require("./class-particips/add-and-update/add.component");
var update_component_1 = require("./class-particips/add-and-update/update.component");
var marks_add_and_edit_component_1 = require("./class-particips/marks/marks-add-and-edit.component");
var results_component_1 = require("./class-particips/results/results.component");
var appRoutes = [
    { path: 'rsurparticips/get', component: rsur_particips_component_1.RsurParticipsComponent },
    { path: 'rsurparticiplist/new', component: rsurparticip_add_form_component_1.RsurParticipAddFormComponent },
    { path: 'plan', component: plan_component_1.PlanComponent },
    { path: 'result', component: result_component_1.ResultComponent },
    { path: 'details', component: particip_details_component_1.ParticipDetailsComponent },
    { path: 'particip-correction', component: particip_correction_component_1.ParticipCorrectionComponent },
    { path: 'class-particips', component: class_particips_plan_component_1.ClassParticipsPlanComponent },
    { path: 'class-particips/list', component: class_particips_list_component_1.ClassParticipsListComponent },
    { path: 'class-particips/upload-excel', component: export_excel_component_1.ClassParticipsExportExcelComponent },
    { path: 'class-particips/new', component: add_component_1.AddClassParticipComponent },
    { path: 'class-particips/update/:id', component: update_component_1.UpdateClassParticipComponent },
    { path: 'class-particips/marks', component: marks_component_1.ClassParticipMarksComponent },
    { path: 'class-particips/marks-edit/:participTestId', component: marks_add_and_edit_component_1.MarksAddAndEditComponent },
    { path: 'class-particips/result/:participTestId', component: results_component_1.ClassParticipResultsComponent, },
    { path: '', redirectTo: '/rsurparticips', pathMatch: 'full' } // redirect to home page on load
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map