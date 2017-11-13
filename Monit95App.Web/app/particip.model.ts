import { PersonModel } from './models/person.model';

export class ParticipModel extends PersonModel {
	public Id: number;
	public ProjectId: number;

	public ClassName: string;
    public SchoolId: string;    
}