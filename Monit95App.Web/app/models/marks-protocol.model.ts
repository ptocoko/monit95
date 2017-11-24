export interface MarksProtocol {
	ParticipCode: number;
	ParticipTestId: number;
	TestName: string;
	QuestionResults: QuestionResult[];
}

interface QuestionResult {
	Name: string;
	Order: number;
	MaxMark: number;
	CurrentMark: number;
}