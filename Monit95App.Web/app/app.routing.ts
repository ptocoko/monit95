import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RsurHomeComponent } from './rsur/rsur-home/rsur-home.component';
import { RsurExamsComponent } from './rsur/rsur-exams/rsur-exams.component';
import { RsurParticipsComponent } from './rsur/rsur-particips/rsur-particips.component';
import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
import { ClassParticipsExportExcelComponent } from "./class-particips/excel-export/export-excel.component";
import { ClassParticipsPlanComponent } from "./class-particips/class-particips-plan.component";
import { AddClassParticipComponent } from "./class-particips/add-and-update/add.component";
import { UpdateClassParticipComponent } from "./class-particips/add-and-update/update.component";
import { MarksAddAndEditComponent } from "./class-particips/marks/marks-add-and-edit.component";

const appRoutes: Routes = [

    { path: 'rsur', component: RsurHomeComponent },
    { path: 'rsur/exams', component: RsurExamsComponent },    
    { path: 'rsur/particips', component: RsurParticipsComponent },    
    { path: 'rsurparticiplist/new', component: RsurParticipAddFormComponent },

    { path: 'plan', component: PlanComponent },
	{ path: 'result', component: ResultComponent },
	{ path: 'details', component: ParticipDetailsComponent },    
	{ path: 'particip-correction', component: ParticipCorrectionComponent },

	{ path: 'class-particips', component: ClassParticipsPlanComponent },
	{ path: 'class-particips/list', component: ClassParticipsListComponent },
	{ path: 'class-particips/upload-excel', component: ClassParticipsExportExcelComponent },
	{ path: 'class-particips/new', component: AddClassParticipComponent },
	{ path: 'class-particips/update/:id', component: UpdateClassParticipComponent },
	{ path: 'class-particips/marks', component: ClassParticipMarksComponent },
	{ path: 'class-particips/marks-edit/:participTestId', component: MarksAddAndEditComponent },   

    { path: '', redirectTo: '/rsur', pathMatch: 'full' } // redirect to home page on load
];

export const routing = RouterModule.forRoot(appRoutes);