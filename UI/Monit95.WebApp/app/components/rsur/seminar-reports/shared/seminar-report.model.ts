export class SeminarReportModel {
	RsurReportId: number;
	DateText: string;
	Text?: string;
	SchoolName: string;
	SeminarFiles: { [key: string]: string };
}