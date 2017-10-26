
import { Component, OnInit } from '@angular/core';
import { RsurResultsService } from "./rsur-results.service";
import { RsurReportModel } from "../report/rsur-report.model";
import { RsurResultModel } from "./rsur-result.model";
import { Router } from "@angular/router";

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
		this.rsurResultsService.getResultsList().subscribe(res => {
			this.resultsList = res;
			this.rsurTests = this.resultsList.map(s => s.TestName).filter((val, i, self) => self.indexOf(val) === i);
			this.isLoading = false;
		})
	}

	openReport(rsurParticipCode: number) {
		this.route.navigate(['/rsur/report', rsurParticipCode])
	}
}
