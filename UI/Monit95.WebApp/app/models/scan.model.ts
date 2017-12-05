export interface Scan {
	SourceName?: string;
	FileId?: number;
	Url?: string;
}

export interface AnswerSheet extends Scan {
	ParticipCode?: number;
	ParticipTestId?: number;
	TestName?: string;
	Marks?: string;
}