import { QuestionResult } from '../marks-protocol.model';

export interface QuestionProtocol {
	ParticipFIO: string;
	OptionNumber: number;
	QuestionMarks: QuestionResult[];
}