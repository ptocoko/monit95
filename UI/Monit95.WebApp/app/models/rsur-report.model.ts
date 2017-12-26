import { SchoolParticip } from '../models/school-particip.model';

export class RsurReportModel {
	Code: number;
	RsurParticipTestId?: number;
	SchoolParticipInfo: SchoolParticip;
	TestNameWithDate: string;
	TestStatus: string;
	TestDate?: string;	
	ExamName: string;
	EgeQuestionResults?: EgeQuestionResult[];
}

class EgeQuestionResult {
	EgeQuestionNumber: number;
	RsurQuestionNumbers: string;
	ElementNames: string;
	Value: number;
}