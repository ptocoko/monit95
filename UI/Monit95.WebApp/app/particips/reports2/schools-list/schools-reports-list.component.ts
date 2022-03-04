import { Component, OnInit } from '@angular/core';
import { Reports2Service } from '../../../services/iTakeEge/reports2/reports2.service';
import { ISchoolReport } from '../../../models/iTakeEge/reports2/ISchoolReport';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	templateUrl: `./app/particips/reports2/schools-list/schools-reports-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/reports2/schools-list/schools-reports-list.component.css?v=${new Date().getTime()}`]
})
export class SchoolsReportsListComponent implements OnInit {
	schoolReports: ISchoolReport[];
	isLoading = false;
	projectTestId = 0;
	projectId: number;
	projectName: string;

	constructor(private service: Reports2Service, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const projectId = Number.parseInt(this.route.snapshot.queryParamMap.get('projectId'), 10);
			const projectName = this.route.snapshot.queryParamMap.get('projectName');
			if (projectId) {
				this.projectId = projectId;
			} else {
				throw new Error('projectId not setted');
			}
			if (projectName) {
				this.projectName = projectName;
			} else {
				throw new Error('projectName not setted');
			}
			this.isLoading = true;

			this.projectTestId = Number.parseInt(params.get('projectTestId'), 10);
			this.service.getSchoolsReports(this.projectTestId)
				.subscribe(rep => {
					this.schoolReports = rep;
					this.isLoading = false;

					
				});
		})
	}

	onNavigate(schoolId: string) {
		console.log(schoolId);
		this.router.navigate(['/particips/reports/' + this.projectId], { queryParams: { schoolId, testCode: this.projectTestId, projectName: this.projectName } });
	}
}

