import { PersonModel } from '../../person.model';

export interface ReportItem extends PersonModel {
	Id: number;
	ParticipTestId: number;
	TestName: string;
	TestCode: string;
	ClassName: string;
	ClassCode: string;
	Grade5: number;
	PassStatus: string;
}

export interface ReportsListModel {
	TotalCount: number;
	Page: number;
	Items: ReportItem[];
}