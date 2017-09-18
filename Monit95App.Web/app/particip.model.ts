import { Person } from "./shared/Person";

export class ParticipModel extends Person {
	public Id: number;
	public ProjectId: number;

	public ClassName: string;
    public SchoolId: string;    
}