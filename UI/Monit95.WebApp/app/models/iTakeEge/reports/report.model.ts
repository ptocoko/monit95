import { PersonModel } from '../../person.model';


export interface ReportModel extends PersonModel {
	TestDateString: string;
	ParticipTestId: number;
	SchoolName: string;
	ProjectName: string;
	TestName: string;
	TestStatus: string;
	IsRiskGroup: boolean;
	ProjectTestId: number;
	Marks: number[];
	ElementsResults: ElementResult[];
}

interface ElementResult {
	ElementNumber: string;
	QuestionNumbers: number[];
	Name: string;
	Value: number;
}