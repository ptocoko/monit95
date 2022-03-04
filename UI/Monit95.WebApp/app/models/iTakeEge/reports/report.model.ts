import { PersonModel } from '../../person.model';
import { MarksModel } from '../../marks.model';


export interface ReportModel extends PersonModel {
	TestDateString: string;
	ParticipTestId: number;
	SchoolName: string;
	ProjectName: string;
	TestName: string;
	TestStatus: string;
	Grade5: number;
	IsRiskGroup: boolean;
	PrimaryMark: number;
	ProjectTestId: number;
	Marks: MarksModel[];
	ElementsResults: ElementResult[];
}

interface ElementResult {
	ElementNumber: string;
	QuestionNumbers: number[];
	Name: string;
	Value: number;
}