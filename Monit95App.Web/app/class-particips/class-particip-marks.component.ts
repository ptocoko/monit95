import { Component, OnInit } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../rsur/marks/marks.service";
import { ParticipService } from "../particip.service";
import { Modal } from "angular2-modal/plugins/bootstrap";

@Component({
	templateUrl: './app/class-particips/class-particip-marks.component.html'
})
export class ClassParticipMarksComponent implements OnInit {
	isLoading: boolean = true;
	particips: ParticipWithMarks[];

	constructor(private marksService: MarksService,
				private participService: ParticipService,
				private modal: Modal) { }

	ngOnInit() {
		this.marksService.getAll(1).subscribe(res => {
			this.particips = res.json() as ParticipWithMarks[];
		})
	}
}