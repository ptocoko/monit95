import { Protocol } from "./protocol.model";

export interface Scan {
	SourceName?: string;
	FileId?: number;
	Url?: string;
}

export interface AnswerSheet extends Scan, Protocol { }