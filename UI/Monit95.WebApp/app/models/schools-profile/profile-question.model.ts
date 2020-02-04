export interface ProfileQuestion {
	Id: number;
	Body: string;
	Description: string;
	IsBooleanAnswer: boolean;
	HasSession: boolean;
	MaxValue: number;
	SessionValues: { [key: string]: number };
	Value: number;
}

export type Session = '2016-2017' | '2017-2018' | '2018-2019';