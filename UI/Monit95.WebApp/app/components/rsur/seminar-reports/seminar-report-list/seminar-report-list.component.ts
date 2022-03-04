
import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { SeminarReportView } from "../shared/seminar-report.model";
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { AccountService } from '../../../../services/account.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportsListComponent {
    isLoading = true;
	reports: SeminarReportView[];
    reportsLength: number;
    schoolNamesFromReports: string[];
	//reportsLoading: boolean = false;

	deleted$: Subject<any> = new Subject();

	constructor(private readonly seminarReportService: SeminarReportService,
				private readonly accountService: AccountService,
				private readonly snackBar: MatSnackBar) { }

    ngOnInit() {
        this.isLoading = true;
		this.deleted$
				.startWith({ 'hello': 'there', 'Obi-Wan': 'Kenobi' })
				.switchMap(() => {
					this.isLoading = true;
					return this.seminarReportService.getReportsList();
				})
				.map((reports: SeminarReportView[]) => {
                    this.isLoading = false;
					this.reportsLength = reports.length;

					return reports;
				}).
				subscribe(reports => this.reports = reports);
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe(response => {
			this.deleted$.next('deleted');
			this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
		});
	}
}
