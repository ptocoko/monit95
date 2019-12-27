import { Component, Input, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
import { ISchoolReport } from '../../../models/iTakeEge/reports2/ISchoolReport';

@Component({
	selector: 'app-school-report',
	template: `
<h4>{{ schoolReport.SchoolName }}</h4>
<app-stacked-bar [values]="values" [colorScheme]="colorScheme" [legend]="legend"></app-stacked-bar>
`,
	styles: [
		`
:host {
	display: block;
	padding: 10px 15px !important;
    border: 1px solid #eee !important;
    border-radius: 5px !important;
	cursor: pointer;
}`
	]
})
export class SchoolReportComponent {
	@Input() schoolReport: ISchoolReport;
	@Output() navigate = new EventEmitter<string>();

	colorScheme = ['#1dab1d', 'red', 'orange'];
	legend = ['сдало', 'не сдало', 'отсутствовало'];
	@HostBinding('class') classes = 'app-school-report list-item-link';

	constructor() {}

	@HostListener('click')
	onNavigate() {
		this.navigate.emit(this.schoolReport.SchoolId);
	}

	get values() {
		return [this.schoolReport.Report.Pass, this.schoolReport.Report.NotPass, this.schoolReport.Report.Absent];
	}
}