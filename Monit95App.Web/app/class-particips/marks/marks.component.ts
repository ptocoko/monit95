import { Component } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { ParticipService } from "../../particip.service";
import { ClassParticipMarksEditModal } from "./marks-edit.modal";
import { MdDialog } from "@angular/material";
import { CLASS_NAMES } from "../add-and-update/add.component";

const PROJECT_TEST_ID: number = 1011;

@Component({
	templateUrl: `./app/class-particips/marks/marks.component.html?v=${new Date().getTime()}`
})
export class ClassParticipMarksComponent {
	isLoading: boolean = true;
	particips: ParticipWithMarks[];

	classes: string[] = CLASS_NAMES;
	searchClass: string;

	constructor(private marksService: MarksService,
		private participService: ParticipService,
		private dialog: MdDialog) { }

	ngOnInit() {
		this.marksService.getAll(PROJECT_TEST_ID).subscribe(res => {
			this.particips = res.json() as ParticipWithMarks[];
			this.isLoading = false;
		})
	}

	changeMarks(marksParticip: ParticipWithMarks) {
		let index = this.particips.indexOf(marksParticip);

		let dialogRef = this.dialog.open(ClassParticipMarksEditModal, { data: { particip: { ...marksParticip } } });

		dialogRef.afterClosed().subscribe(res => {
			if (res ? res.particip : res) {
				this.particips[index] = res.particip

				if (res.toNext) {
					for (var i = index + 1; i < this.particips.length; i++) {
						if (!this.particips[i].Marks) {
							this.changeMarks(this.particips[i]);
							return;
						}
					}
				}
			}
		});
	}
}