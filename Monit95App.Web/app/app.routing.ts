﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipListComponent } from './particips/particip-list.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './particips/details/particip-details.component';
import { EditParticipComponent } from './particips/edit-particip/edit-particip.component';
import { ParticipCorrectionComponent } from './particips/correction/particip-correction.component';

const appRoutes: Routes = [
    { path: 'particips', component: ParticipListComponent },
    { path: 'plan', component: PlanComponent },
	{ path: 'result', component: ResultComponent },
	{ path: 'details', component: ParticipDetailsComponent },
    { path: 'edit-particip', component: EditParticipComponent },
    { path: 'particip-correction', component: ParticipCorrectionComponent },
    { path: '', redirectTo: '/particips', pathMatch: 'full' } // redirect to home page on load
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);