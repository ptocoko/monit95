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
	Grade5: number;
	RsurTestId: number;
	TestDate?: string;	
	ExamName: string;
	Marks: number[];
	EgeQuestionResults?: EgeQuestionResult[];
}

class EgeQuestionResult {
	EgeQuestionNumber: number;
	RsurQuestionNumbers: string;
	ElementNames: string;
	Value: number;
}