import { PersonModel } from './person.model';

export class ParticipModel extends PersonModel {
	public Id: number;

	public ProjectId?: number;
	public Birthday?: string;
	public ClassName?: string;
	public SchoolId?: string;
	public SchoolName?: string;
	public DocumNumber?: number;
	public DataSource?: string;
}