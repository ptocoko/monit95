
import { Component, OnInit } from '@angular/core';
import { RsurResultsService } from "./rsur-results.service";
import { RsurReportModel } from "../report/rsur-report.model";
import { RsurResultModel } from "./rsur-result.model";
import { Router } from "@angular/router";

const TEST_DATE = '2017-10-11';

@Component({
	selector: 'results-list',
	templateUrl: `./app/rsur/results/results-list.component.html?v=${new Date().getTime()}`
})
export class RsurResultsListComponent implements OnInit {
	resultsList: RsurResultModel[];
	rsurTests: string[];
	isLoading: boolean;
	searchTest: string = 'Все результаты';

	constructor(private readonly rsurResultsService: RsurResultsService, 
				private readonly route: Router) { }

	ngOnInit() {
		this.isLoading = true;
		this.rsurResultsService.getResultsList(TEST_DATE).subscribe(res => {
			this.resultsList = res.json() as RsurResultModel[]
			this.rsurTests = this.resultsList.map(s => s.TestNameWithDate).filter((val, i, self) => self.indexOf(val) === i);
			this.isLoading = false;
		})
	}

	openReport(rsurParticipCode: number) {
		this.route.navigate(['/rsur/report', rsurParticipCode])
	}
}
