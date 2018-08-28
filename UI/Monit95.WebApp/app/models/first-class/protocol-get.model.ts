import { PersonModel } from '../person.model';

export interface ProtocolGetModel extends PersonModel {
	ParticipTestId: number;
	Marks: string;
	ClassName: string;
}