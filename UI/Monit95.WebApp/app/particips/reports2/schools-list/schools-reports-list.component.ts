import { Component, OnInit } from '@angular/core';
import { Reports2Service } from '../../../services/iTakeEge/reports2/reports2.service';
import { ISchoolReport } from '../../../models/iTakeEge/reports2/ISchoolReport';

@Component({
	templateUrl: `./app/particips/reports2/schools-list/schools-reports-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/reports2/schools-list/schools-reports-list.component.css?v=${new Date().getTime()}`]
})
export class SchoolsReportsListComponent implements OnInit {
	schoolReports: ISchoolReport[];
	isLoading = false;

	constructor(private service: Reports2Service) { }

	ngOnInit() {
		this.isLoading = true;
		this.service.getSchoolsReports()
			.subscribe(rep => {
				this.schoolReports = rep;
				this.isLoading = false;
			});
	}
}