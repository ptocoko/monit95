import { Component } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { ParticipService } from "../../particip.service";
import { Router } from "@angular/router";

const CLASS_NAMES: string[] = ['Все классы', '1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];

const PROJECT_TEST_ID: number = 1011;

@Component({
	templateUrl: `./app/class-particips/marks/marks.component.html?v=${new Date().getTime()}`
})
export class ClassParticipMarksComponent {
	isLoading: boolean = true;
	particips: ParticipWithMarks[];
	participsWithoutMarks: number = 0;

	classes: string[] = CLASS_NAMES;
	searchClass: string;

	constructor(private marksService: MarksService,
				private participService: ParticipService,
				private router: Router) { }

	ngOnInit() {
		this.marksService.getAll(PROJECT_TEST_ID).subscribe(res => {
			this.particips = res.json() as ParticipWithMarks[];
			this.participsWithoutMarks = this.particips.filter(f => !f.Marks).length;
			this.isLoading = false;
		})
	}

    changeMarks(marksParticip: ParticipWithMarks) {
		this.router.navigate(['/class-particips/marks-edit', marksParticip.ParticipTestId])
	}
}