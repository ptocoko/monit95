import { Component, OnInit } from '@angular/core';
import { MarksService } from "./marks.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RsurTestService } from "../rsur-test/rsur-test.service";

export class RsurParticipMarks {
	ParticipTestId: number;
	Code: number;
	Marks: string;
}

@Component({
	templateUrl: `./app/rsur/marks/marks-list.component.html?v=${new Date().getTime()}`
})
export class RsurMarksListComponent implements OnInit {
	rsurParticips: RsurParticipMarks[];
	isLoading: boolean;
	participsWithoutMarks: number = 0;
	testNumberCodeWithName: string;

	constructor(private readonly marksService: MarksService, 
				private readonly route: ActivatedRoute,
				private readonly router: Router,
				private readonly rsurTestService: RsurTestService) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			let rsurTestId = params['rsurTestId'];

			this.rsurTestService.getTestName(rsurTestId).subscribe(res => this.testNumberCodeWithName = res.json());

			this.marksService.getRsurMarksByRsurTestId(rsurTestId).subscribe(res => {
				this.rsurParticips = res.json() as RsurParticipMarks[];
				this.participsWithoutMarks = this.rsurParticips.filter(f => !f.Marks).length;
				this.isLoading = false;
			})
		})
	}

	changeMarks(participTestId: number) {
		this.router.navigate(['/rsur/marks-edit', participTestId]);
	}
}