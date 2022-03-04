import { ExamModel } from './rsur/exam.model';

export interface ReportsInfo {
	SchoolNames?: string[];
	TestNames?: string[];
	ExamNames?: ExamModel[];
}