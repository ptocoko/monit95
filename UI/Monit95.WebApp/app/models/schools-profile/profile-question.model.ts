export interface ProfileQuestion {
	Body: string;
	Description: string;
	IsBooleanAnswer: boolean;
	HasSession: boolean;
	MaxValue: number;
	SessionValues: { [key: string]: number };
	Value: number;
}