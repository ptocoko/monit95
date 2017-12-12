import { Protocol } from "./protocol.model";

export interface MarksProtocol extends Protocol {
	FileId?: number;
	IsUpdate?: boolean;
	QuestionResults: QuestionResult[];
}

interface QuestionResult {
	Name: string;
	Order: number;
	MaxMark: number;
	CurrentMark: number;
}