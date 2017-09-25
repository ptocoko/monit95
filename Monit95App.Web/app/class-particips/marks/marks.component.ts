import { Component } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { ParticipService } from "../../particip.service";
import { MdDialog } from "@angular/material";
import { CLASS_NAMES } from "../add-and-update/add.component";
import { Router } from "@angular/router";

const PROJECT_TEST_ID: number = 1011; //TODO: IT'S TEST FAKE NUMBER!!!
export const MAX_MARKS = [
	{ Name: '1', MaxMark: 2 },
	{ Name: '2', MaxMark: 3 },
	{ Name: '3', MaxMark: 4 },
	{ Name: '4', MaxMark: 1 }
]

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
				private router: Router) { }

	ngOnInit() {
		this.marksService.getAll(PROJECT_TEST_ID).subscribe(res => {
			this.particips = res.json() as ParticipWithMarks[];
			this.isLoading = false;
		})
	}

    changeMarks(marksParticip: ParticipWithMarks) {
		this.router.navigate(['/class-particips/marks', marksParticip.ParticipTestId])
	}
}