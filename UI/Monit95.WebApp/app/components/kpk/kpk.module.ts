import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared-module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
	{ path: 'kpk/home', component: HomeComponent }
]

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule,
		MaterialModule
	],
	declarations: [HomeComponent]
})
export class KpkModule { }