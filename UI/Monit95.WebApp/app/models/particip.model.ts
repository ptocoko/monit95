import { PersonModel } from './person.model';

export class ParticipModel extends PersonModel {
	public Id: number;
	public ProjectId: number;

	public Birthday: Date;
	public ClassName: string;
    public SchoolId: string;    
}