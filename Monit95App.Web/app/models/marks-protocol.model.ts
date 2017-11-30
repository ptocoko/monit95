export interface MarksProtocol {
	ParticipCode: number;
	ParticipTestId: number;
	FileId?: number;
	TestName: string;
	QuestionResults: QuestionResult[];
}

interface QuestionResult {
	Name: string;
	Order: number;
	MaxMark: number;
	CurrentMark: number;
}