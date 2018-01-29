import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarksProtocolComponent } from '../components/rsur/protocols/shared/marks-protocol.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		MarksProtocolComponent
	],
	exports: [
		MarksProtocolComponent
	]
})
export class SharedModule { }