﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RsurParticipComponent } from './rsur/rsurparticip.component';
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
import { ClassParticipMarksEditComponent } from "./class-particips/marks/marks-edit.component";

const appRoutes: Routes = [
    { path: 'rsurparticips', component: RsurParticipComponent },    
    { path: 'rsurparticips/new', component: RsurParticipAddFormComponent },
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
	{ path: 'class-particips/marks-add/:id', component: ClassParticipMarksComponent },
	{ path: 'class-particips/marks-edit/:id', component: ClassParticipMarksEditComponent },
    { path: '', redirectTo: '/rsurparticips', pathMatch: 'full' } // redirect to home page on load
];

export const routing = RouterModule.forRoot(appRoutes);