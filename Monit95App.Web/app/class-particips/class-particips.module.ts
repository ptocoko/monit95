import { NgModule } from '@angular/core';
import { ClassParticipsListComponent } from "./class-particips-list.component";
import { ClassParticipsRoutingModule } from "./class-particips.routing";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [
		ClassParticipsListComponent
	],
	imports: [ CommonModule, ClassParticipsRoutingModule ]
})
export class ClassParticipsModule { }