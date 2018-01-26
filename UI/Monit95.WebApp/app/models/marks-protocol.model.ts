import { Protocol } from "./protocol.model";

export interface MarksProtocol extends Protocol {
	FileId?: number;
	QuestionResults: QuestionResult[];
}

export interface QuestionResult {
	Name: string;
	Order: number;
	MaxMark: number;
	CurrentMark: number;
}