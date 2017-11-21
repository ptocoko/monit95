export interface ParticipTestModel {
	ParticipCode: number;
	ParticipTest: ParticipTest;
}

interface ParticipTest {
	ParticipTestId: number;
	TestName: string;
	Questions: Question[];
}

interface Question {
	Name: string;
	Order: number;
	MaxMark: number;
	CurrentMark: number;
}