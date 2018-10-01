import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { MaterialModule } from '../../material.module';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Route[] = [
	{ path: 'two-three-2/home', component: HomeComponent },
	{ path: 'two-three-2', redirectTo: 'two-three-2/home', pathMatch: 'full' }
]

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		SharedModule,
		MaterialModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	declarations: [HomeComponent]
})
export class TwoThreeModule2 { }