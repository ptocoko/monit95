import { ClassModel } from '../class.model';

export interface ParticipModel {
	Id: number;
	Surname: string;
	Name: string;
	SecondName: string;
	ClassName: string;
	ClassId: string;
	WasDoo: boolean;
}

export interface ParticipsList {
	Items: ParticipModel[];
	TotalCount: number;
	Classes: ClassModel[];
}