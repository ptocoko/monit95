import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared-module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: 'kpk/home', component: HomeComponent }
]

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: [HomeComponent]
})
export class KpkModule { }