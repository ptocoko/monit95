
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

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportsListComponent {
	reports: SeminarReportView[];
	reportsLength: number;
	reportsLoading: boolean = false;

	deletedEvent: EventEmitter<any> = new EventEmitter();

	constructor(private readonly seminarReportService: SeminarReportService,
				private readonly accountService: AccountService,
				private readonly snackBar: MatSnackBar) { }

	ngOnInit() {
		this.deletedEvent
				.startWith({ 'hello': 'there', 'Obi-Wan': 'Kenobi' })
				.switchMap(() => {
					this.reportsLoading = true;
					return this.seminarReportService.getReportsList();
				})
				.map((reports: SeminarReportView[]) => {
					this.reportsLoading = false;
					this.reportsLength = reports.length;

					return reports;
				}).
				subscribe(reports => this.reports = reports);
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe(response => {
			this.deletedEvent.emit();
			this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
		});
	}
}
