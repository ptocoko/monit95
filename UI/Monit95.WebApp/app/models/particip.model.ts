import { PersonModel } from './person.model';

export class ParticipModel extends PersonModel {
	public Id: number;

	public ProjectId?: number;
	public Birthday?: string;
	public ClassName?: string;
	public ClassId?: string;
	public SchoolId?: string;
	public SchoolName?: string;
	public DocumNumber?: number;
	public DataSource?: string;
	public ActualCode12?: number;
	public PrevYearGrade: number;
	public BookAuthor: string;
}