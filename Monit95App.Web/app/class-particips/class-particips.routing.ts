import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassParticipsListComponent } from "./class-particips-list.component";

const routes: Routes = [
	{ path: 'class-particips', component: ClassParticipsListComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClassParticipsRoutingModule { }