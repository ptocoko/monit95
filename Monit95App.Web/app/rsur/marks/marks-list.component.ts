import { Component, OnInit } from '@angular/core';
import { MarksService } from "./marks.service";
import { ActivatedRoute, Router } from "@angular/router";

export class RsurParticipMarks {
	ParticipTestId: number;
	Surname: string;
	Name: string;
	SecondName: string;
	Marks: string;
}

@Component({
	templateUrl: `./app/rsur/marks/marks-list.component.html?v=${new Date().getTime()}`
})
export class RsurMarksListComponent implements OnInit {
	rsurParticips: RsurParticipMarks[];
	isLoading: boolean;
	participsWithoutMarks: number = 0;

	constructor(private readonly marksService: MarksService, private readonly route: ActivatedRoute, private readonly router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let rsurTestId = params['rsurTestId'];
			this.marksService.getRsurMarksByRsurTestId(rsurTestId).subscribe(res => {
				this.rsurParticips = res.json() as RsurParticipMarks[];
				this.participsWithoutMarks = this.rsurParticips.filter(f => !f.Marks).length;
			})
		})
	}

	changeMarks(participTestId: number) {
		this.router.navigate(['/rsur/marks-edit', participTestId]);
	}
}