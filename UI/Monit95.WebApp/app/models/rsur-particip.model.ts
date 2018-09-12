import { SchoolParticip } from "./school-particip.model";
import { BlockStatuses } from '../enums/rsur.block-status';

export class RsurParticipModel {
	public Code: number;
	public SchoolParticipInfo: SchoolParticip;

	public AreaCodeWithName?: string;

	public RsurSubjectName?: string;
	public LastBlockName?: string;
	public LastBlockStatus?: BlockStatuses;
	public ActualCode: number;
	
	public Birthday?: Date;

	public CategoryName?: string;
	public Experience?: number;

	public Phone?: string;
	public Email?: string;
	
	public ClassNumbers?: string;

	public SchoolId?: string;
	public SchoolIdFrom?: string;
}