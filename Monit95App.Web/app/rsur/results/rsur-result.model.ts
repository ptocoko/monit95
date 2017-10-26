import { Person } from "../../shared/Person";

export class RsurResultModel {
	Code: number;
	SchoolParticipInfo: SchoolModel;
	IsPassTest: string;
	TestNameWithDate: string;
}

class SchoolModel extends Person {
	SchoolName: string;
}