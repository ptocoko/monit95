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
	WithSkills: boolean;
	SkillQuestionResults: SkillQuestionResult[];
	Grade100?: number;
}

class EgeQuestionResult {
	EgeQuestionNumber: number;
	RsurQuestionNumbers: string;
	ElementNames: string;
	Value: number;
}

class SkillQuestionResult {
	Name: string;
	QuestionResults: EgeQuestionResult[];
}