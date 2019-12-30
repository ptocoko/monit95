
import {map, switchMap, startWith} from 'rxjs/operators';

import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { SeminarReportView } from "../shared/seminar-report.model";
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { AccountService } from '../../../../services/account.service';
import { Observable ,  Subject } from 'rxjs';




import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'reports-list',
	templateUrl: './seminar-report-list.component.html',
	styleUrls: ['./seminar-report-list.component.css']
})
export class SeminarReportsListComponent {
    isLoading = true;
	reports: SeminarReportView[];
    reportsLength: number;
    schoolNamesFromReports: string[];
	//reportsLoading: boolean = false;

	deleted$: Subject<any> = new Subject();

	constructor(private readonly seminarReportService: SeminarReportService,
				public readonly accountService: AccountService,
				private readonly snackBar: MatSnackBar) { }

    ngOnInit() {
        this.isLoading = true;
		this.deleted$.pipe(
				startWith({ 'hello': 'there', 'Obi-Wan': 'Kenobi' }),
				switchMap(() => {
					this.isLoading = true;
					return this.seminarReportService.getReportsList();
				}),
				map((reports: SeminarReportView[]) => {
                    this.isLoading = false;
					this.reportsLength = reports.length;

					return reports;
				}),).
				subscribe(reports => this.reports = reports);
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe(response => {
			this.deleted$.next('deleted');
			this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
		});
	}
}
