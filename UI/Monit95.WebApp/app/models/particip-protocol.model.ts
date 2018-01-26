import { ParticipModel } from "./particip.model";
import { QuestionResult } from "./marks-protocol.model";

export class ParticipProtocolModel extends ParticipModel {
	public ParticipTestId: number;
	public Marks: string;
	public QuestionResults: QuestionResult[];
}