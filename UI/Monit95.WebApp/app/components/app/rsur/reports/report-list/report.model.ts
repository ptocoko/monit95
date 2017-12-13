import { SchoolParticip } from '../../../../models/school-particip.model';

export class ReportModel {
	Code: number;
    SchoolParticipInfo: SchoolParticip;
	IsPassTest: string;
    TestNameWithDate: string;
    RsurParticipTestId: number;
}