import { SchoolParticip } from '../models/school-particip.model';

export interface ReportsList {
	Items: RsurReportModel[];
	TotalCount: number;
}

export class RsurReportModel {
    ParticipCode: number;
    FullParticipName: string;
    TestDateString: string;
	RsurParticipTestId?: number;
	SchoolParticipInfo: SchoolParticip;
	TestName: string;
	TestNumberCode: string;
	TestStatus: string;
	RsurTestId: number;
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