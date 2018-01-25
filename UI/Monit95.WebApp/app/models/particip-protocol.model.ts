import { ParticipModel } from "./particip.model";
import { MarksProtocol } from "./marks-protocol.model";

export class ParticipProtocolModel extends ParticipModel {
	public ParticipTestId: number;
	public Marks: string;
	public MarksProtocol: MarksProtocol;
}