import { SchoolParticip } from '../models/school-particip.model';

export class RsurReportModel {
    ParticipCode: number;
    FullParticipName: string;
    TestDateString: string;
    TestName: string;
    TestStatus: string;
	RsurParticipTestId?: number;
	SchoolParticipInfo: SchoolParticip;
	TestName: string;
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