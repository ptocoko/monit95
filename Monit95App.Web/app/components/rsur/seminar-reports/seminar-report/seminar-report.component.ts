
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { SeminarReportModel } from '../shared/seminar-report.model';
import { Location } from '@angular/common';

@Component({
	selector: 'seminar-report',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.html?v=${new Date().getTime()}`
})
export class SeminarReportComponent implements OnInit {
	report: SeminarReportModel = new SeminarReportModel();
	isLoading: boolean;
	imageLinks: JQuery<HTMLAnchorElement>;

	constructor(private router: Router, 
				private route: ActivatedRoute,
				private seminarReportService: SeminarReportService,
				private location: Location) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			let rsurReportId = params['id'];

			this.seminarReportService.getReport(rsurReportId).subscribe(res => {
				this.report = res;
				this.isLoading = false;
				$.ready.then(() => {
					this.imageLinks = $("#photos").find("a") as JQuery<HTMLAnchorElement>;
				});
			});
		})
	}

	downloadPhotos() {
		this.imageLinks.each((i, elem) => {
			elem.setAttribute('download', 'image_' + (i + 1));
			elem.click();
			elem.removeAttribute('download');
		})
	}
}
