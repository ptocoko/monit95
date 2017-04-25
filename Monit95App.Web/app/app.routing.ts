import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipComponent } from './particip/particip.component'; //import home components
import { PlanComponent } from './plan/plan.component'; //import about component

const appRoutes: Routes = [
    { path: 'particip', component: ParticipComponent },
    { path: 'plan', component: PlanComponent },
    { path: '', component: ParticipComponent, pathMatch: 'full' } // redirect to home page on load
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);