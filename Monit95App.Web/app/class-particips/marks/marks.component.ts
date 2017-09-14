import { Component } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { ParticipService } from "../../particip.service";
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';

const PROJECT_TEST_ID: number = 11;

@Component({
	templateUrl: './app/class-particips/marks/marks.component.html'
})
export class ClassParticipMarksComponent {
	isLoading: boolean = true;
	particips: ParticipWithMarks[];

	constructor(private marksService: MarksService,
		private participService: ParticipService,
		private modal: Modal) { }

	ngOnInit() {
		this.marksService.getAll(PROJECT_TEST_ID).subscribe(res => {
			this.particips = res.json() as ParticipWithMarks[];
		})
	}
}