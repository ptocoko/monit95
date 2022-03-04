export interface ISchoolReport {
	SchoolId: string;
	SchoolName: string;
	Report: IReport;
}

export interface IReport {
	Pass: number;
	NotPass: number;
	Absent: number;
}