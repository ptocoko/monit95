import { Component } from '@angular/core';
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { DialogRef } from "angular2-modal";
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";

const MAX_MARKS = [
	{ Name: '1', MaxMark: 2 },
	{ Name: '2', MaxMark: 3 },
	{ Name: '3', MaxMark: 4 },
	{ Name: '4', MaxMark: 1 }
]

export class ClassParticipMarksEditModalData extends BSModalContext {
	particip: ParticipWithMarks;
}

@Component({
	templateUrl: `./app/class-particips/marks/marks-edit.modal.html?v=${new Date().getTime()}`
})
export class ClassParticipMarksEditModal {
	particip: ParticipWithMarks;
	maxMarks: any;
	marksArray: number[] = [];

	statusText: string;

	constructor(private dialog: DialogRef<ClassParticipMarksEditModalData>, private marksService: MarksService) {
		this.particip = dialog.context.particip;
		this.particip.Marks = '1; 2; 3.5; 0.5';
		this.maxMarks = MAX_MARKS;

		if (this.particip.Marks) {
			let marks = this.particip.Marks;
			marks.split(';').map(mark => {
				this.marksArray.push(parseInt(mark.trim()));
			});
		}
	}

	onSubmit() {
		//TODO: releaze that!
	}
}