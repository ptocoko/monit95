import { QuestionResult } from '../marks-protocol.model';

export interface QuestionProtocol {
	ParticipFIO: string;
	QuestionMarks: QuestionResult[];
}