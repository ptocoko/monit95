import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ISchoolReport } from '../../../models/iTakeEge/reports2/ISchoolItem';

@Component({
	selector: 'app-school-report',
	template: `
<div>{{ schoolReport.SchoolName }}</div>
<app-stacked-bar [values]="values" [colorScheme]="colorScheme"></app-stacked-bar>
`,
	styles: [
		`
:host {
	display: block;
}`
	]
})
export class SchoolReportComponent {
	@Input() schoolReport: ISchoolReport;
	@Output() navigate = new EventEmitter<string>();

	colorScheme = ['green', 'red', 'orange'];

	constructor() {}

	//@HostListener('onClick')
	//showReports() {
	//	this.router.navigateByUrl('/particips/reports/27', { queryParams: { schoolId: this.schoolReport.SchoolId } });
	//}
	@HostListener('click')
	onNavigate() {
		this.navigate.emit(this.schoolReport.SchoolId);
	}

	get values() {
		return [this.schoolReport.Report.Pass, this.schoolReport.Report.NotPass, this.schoolReport.Report.Absent];
	}
}