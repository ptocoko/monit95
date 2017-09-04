import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RsurParticipComponent } from './rsur/rsurparticip.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { EditParticipComponent } from './rsur/edit-particip/edit-particip.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';

const appRoutes: Routes = [
    { path: 'rsurparticips', component: RsurParticipComponent },
    { path: 'plan', component: PlanComponent },
	{ path: 'result', component: ResultComponent },
	{ path: 'details', component: ParticipDetailsComponent },
    { path: 'edit-particip', component: EditParticipComponent },
	{ path: 'particip-correction', component: ParticipCorrectionComponent },
	{ path: 'class-particips', component: ClassParticipsListComponent },
    { path: '', redirectTo: '/rsurparticips', pathMatch: 'full' } // redirect to home page on load
];

export const routing = RouterModule.forRoot(appRoutes);