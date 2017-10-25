
import { Component, OnInit } from '@angular/core';
import { RsurResultsService } from "./rsur-results.service";
import { RsurReportModel } from "../report/rsur-report.model";
import { RsurResultModel } from "./rsur-result.model";

@Component({
	selector: 'results-list',
	templateUrl: `./app/rsur/results/results-list.component.html?v=${new Date().getTime()}`
})
export class RsurResultsListComponent implements OnInit {
	resultsList: RsurResultModel[];
	rsurTests: Array<any>;
	isLoading: boolean;

	constructor(private readonly rsurResultsService: RsurResultsService) { }

	ngOnInit() {
		this.isLoading = true;
		this.rsurResultsService.getResultsList().subscribe(res => {
			this.resultsList = res;
			this.rsurResultsService.getTests().subscribe(res => {
				this.rsurTests = res;
				this.isLoading = false;
			});
		})
	}
}
