import { PersonModel } from '../../person.model';


export interface ReportModel extends PersonModel {
	TestDateString: string;
	ParticipTestId: number;
	SchoolName: string;
	TestName: string;
	TestStatus: string;
	ProjectTestId: number;
	Marks: number[];
	ElementsResults: ElementResult[];
}

interface ElementResult {
	ElementNumber: number;
	QuestionNumbers: number[];
	Name: string;
	Value: number;
}