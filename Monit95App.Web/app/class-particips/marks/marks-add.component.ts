import { Component, Inject } from '@angular/core';
import { MarksService, ParticipWithMarks } from "../../rsur/marks/marks.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MAX_MARKS } from "./marks.component";


@Component({
	templateUrl: `./app/class-particips/marks/marks-add.component.html?v=${new Date().getTime()}`
})
export class ClassParticipMarksAddComponent {
	particip: ParticipWithMarks;
	maxMarks: any = MAX_MARKS;
	marksArray: string[] = [];

	statusText: string;

	constructor(private router: Router, private route: ActivatedRoute, private marksService: MarksService) {
		let participTestId = this.route.snapshot.paramMap.get('id');

		let marks = this.particip.Marks;
		marks.split(';').map(mark => {
			this.marksArray.push(mark.trim());
		});
	}

	save(toNext: boolean) {
		this.particip.Marks = this.marksArray.join('; ');

	}

	cancel() {
		this.router.navigate(['/class-particips/marks'])
	}
}