export class QuestionProtocolEdit {
	public ParticipInfo: string;
	public MarkCollection: QuestionMarkEdit[];
}

export class QuestionMarkEdit {
	public Order: number;
	public MaxMark: number;
	public AwardedMark: number;
	public QuestionMarkId: number;
	public Name: string;
}