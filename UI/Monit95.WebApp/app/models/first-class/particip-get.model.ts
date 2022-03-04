import { ClassModel } from '../class.model';

export interface ParticipGetModel {
	Id: number;
	Surname: string;
	Name: string;
	SecondName: string;
	Birthday: Date;
	ClassName: string;
	ClassId: string;
	WasDoo: boolean;
	isDeleting: boolean;
}

export interface ParticipsList {
	Items: ParticipGetModel[];
	TotalCount: number;
	Classes: ClassModel[];
}