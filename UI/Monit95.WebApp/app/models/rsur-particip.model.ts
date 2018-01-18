import { SchoolParticip } from "./school-particip.model";

export class RsurParticipModel {
	public Code: number;
	public SchoolParticipInfo: SchoolParticip;
    //public Surname: string;
    //public Name: string;     
    //public SecondName?: string;
    //public SchoolIdWithName: string;
    public RsurSubjectName: string;
    public CategoryName: string;
    public AreaCodeWithName: string;
    public Birthday: Date;
    public Experience: number;
    public Phone: string;
    public ClassNumbers: string;
    public ActualCode: number;
    public Email: string;
    public SchoolIdFrom?: string;         
}