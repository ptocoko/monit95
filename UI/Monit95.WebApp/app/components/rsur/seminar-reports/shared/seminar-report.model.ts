export class SeminarReportView {
	RsurReportId: number;
	DateText: string;	
	SchoolName: string;
}

export class SeminarReportEdit {
	SeminarReportViewDto: SeminarReportView;
	SeminarFiles: { [key: string]: string };
}