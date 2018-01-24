import { PersonModel } from './person.model';

export class ParticipModel extends PersonModel {
	public Id: number;
	public ProjectId: number;

	public Birthday: string;
	public ClassName: string;
	public SchoolId: string;
	public DocumNumber: number;
}