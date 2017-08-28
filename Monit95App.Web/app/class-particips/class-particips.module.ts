import { NgModule } from '@angular/core';
import { ClassParticipsListComponent } from "./class-particips-list.component";
import { ClassParticipsRoutingModule } from "./class-particips.routing";
import { CommonModule } from "@angular/common";
import { ExportExcelModal } from "./export-excel-modal.component";
import { AddClassParticipModal } from "./add-class-particip.modal";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		ClassParticipsListComponent,
		ExportExcelModal,
		AddClassParticipModal
	],
	imports: [HttpModule, FormsModule, CommonModule, ClassParticipsRoutingModule],
	entryComponents: [ExportExcelModal, AddClassParticipModal]
})
export class ClassParticipsModule { }