import { Component, Inject } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

const MAX_MARKS = [
	{ Name: '1', MaxMark: 2 },
	{ Name: '2', MaxMark: 3 },
	{ Name: '3', MaxMark: 4 },
	{ Name: '4', MaxMark: 1 }
]

@Component({
	templateUrl: `./app/class-particips/marks/marks-edit.modal.html?v=${new Date().getTime()}`
})
export class ClassParticipMarksEditModal {
	particip: ParticipWithMarks;
	maxMarks: any;
	marksArray: string[] = [];

	statusText: string;

	constructor(private dialogRef: MdDialogRef<ClassParticipMarksEditModal>, @Inject(MD_DIALOG_DATA) private data: any, private marksService: MarksService) {
		this.particip = data.particip;
		this.maxMarks = MAX_MARKS;

		if (this.particip.Marks) {
			let marks = this.particip.Marks;
			marks.split(';').map(mark => {
				this.marksArray.push(mark.trim());
			});
		}
	}

	onSubmit() {
		console.log(this.marksArray);
		this.particip.Marks = this.marksArray.join('; ');
	}

	toNext() {
		this.particip.Marks = this.marksArray.join('; ');
		this.dialogRef.close({ toNext: true });
	}

	cancel() {
		this.dialogRef.close();
	}
}