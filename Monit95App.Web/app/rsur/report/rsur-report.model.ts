import { Person } from "../../shared/Person";

export class RsurReportModel extends Person {
	Code: number;
	SchoolName: string;
	TestNameWithDate: string;
	IsPassTest: boolean;
	TestDate: string;
	TestNumberCodeWithName: string;
	EgeQuestionResults: EgeQuestionResult[];
}

export class EgeQuestionResult {
	EgeQuestionNumber: number;
	RsurQuestionNumbers: string;
	ElementNames: string;
	Value: number;
}