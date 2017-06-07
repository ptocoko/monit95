﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipsComponent } from './particips/particips.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './particips/particip-details.component';

const appRoutes: Routes = [
    { path: 'particips', component: ParticipsComponent },
    { path: 'plan', component: PlanComponent },
	{ path: 'result', component: ResultComponent },
	{ path: 'details', component: ParticipDetailsComponent },
    { path: '', redirectTo: '/particips', pathMatch: 'full' } // redirect to home page on load
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);