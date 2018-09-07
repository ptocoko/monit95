import { PersonModel } from '../person.model';

export interface RsurParticipPostModel extends PersonModel {
	Birthday?: Date;
	RsurSubjectCode: number;
	CategoryId: number;
	Experience: number;
	Phone: string;
	Email: string;
	SchoolId: string;
}