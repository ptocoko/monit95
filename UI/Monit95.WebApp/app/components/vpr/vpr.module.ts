import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { HomeComponent } from './home/home.component';
import { VprService } from '../../services/vpr.service';
import { StatsComponent } from './statistics/stats.component';
import { ClassSelectorComponent } from './class-selector/class-selector.component';

const routes: Routes = [
	{ path: 'vpr/home', component: HomeComponent },
	{ path: 'vpr/stats', component: StatsComponent }
]

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule,
		MaterialModule
	],
	declarations: [
		HomeComponent,
		StatsComponent,
		ClassSelectorComponent,
	],
	providers: [VprService]
})
export class VprModule { }