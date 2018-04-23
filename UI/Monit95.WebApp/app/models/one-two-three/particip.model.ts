export interface ParticipModel {
	Id: number;
	Surname: string;
	Name: string;
	SecondName: string;
	ClassName: string;
	ClassId: string;
}

export interface ParticipsList {
	Items: ParticipModel[];
	TotalCount: number;
}