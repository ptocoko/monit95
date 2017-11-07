
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SeminarReportService } from "../../../services/seminar-report.service";

@Component({
	selector: 'seminar-report',
	templateUrl: `./app/components/rsur/seminar-report/report.component.html?v=${new Date().getTime()}`
})
export class SeminarReportComponent implements OnInit {
	constructor(private router: Router, 
				private route: ActivatedRoute,
				private seminarReportService: SeminarReportService) { }

	ngOnInit() {
		
	}
}
