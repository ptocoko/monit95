import { Person } from "../../shared/Person";
import { SchoolParticip } from "../../shared/school-particip.model";

export class RsurReportModel {
	Code: number;
	SchoolParticipInfo: SchoolParticip;
	TestNameWithDate: string;
	IsPassTest: string;
	TestDate: string;	
	EgeQuestionResults: EgeQuestionResult[];
}

class EgeQuestionResult {
	EgeQuestionNumber: number;
	RsurQuestionNumbers: string;
	ElementNames: string;
	Value: number;
}