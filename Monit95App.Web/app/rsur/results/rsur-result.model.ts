import { Person } from "../../shared/Person";
import { SchoolParticip } from "../../shared/school-particip.model";

export class RsurResultModel {
	Code: number;
	SchoolParticipInfo: SchoolParticip;
	IsPassTest: string;
    TestNameWithDate: string;
    RsurParticipTestId: number;
}