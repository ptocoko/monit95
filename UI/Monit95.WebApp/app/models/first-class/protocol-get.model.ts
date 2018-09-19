import { PersonModel } from '../person.model';
import { ClassModel } from '../class.model';

export interface ProtocolGetModel extends PersonModel {
	ParticipTestId: number;
	Marks: string;
	ClassName: string;
	ClassId: string;
}

export interface ProtocolsList {
	Items: ProtocolGetModel[];
	TotalCount: number;
	ProcessedItemsCount: number;
	NotProcessedItemsCount: number;
	Classes: ClassModel[];
}