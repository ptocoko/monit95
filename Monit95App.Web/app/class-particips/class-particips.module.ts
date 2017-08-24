import { NgModule } from '@angular/core';
import { ClassParticipsListComponent } from "./class-particips-list.component";
import { ClassParticipsRoutingModule } from "./class-particips.routing";
import { CommonModule } from "@angular/common";
import { ExportExcelModal } from "./export-excel-modal.component";

@NgModule({
	declarations: [
		ClassParticipsListComponent,
		ExportExcelModal
	],
	imports: [CommonModule, ClassParticipsRoutingModule],
	entryComponents: [ExportExcelModal]
})
export class ClassParticipsModule { }