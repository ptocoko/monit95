import { QuestionResult } from "../models/marks-protocol.model";

export class Constant {
	public static PROJECT_ID = 12;

	public static questionResultsSortFunc = (a: QuestionResult, b: QuestionResult) => {
		if (a.Order < b.Order) return -1;
		else if (a.Order > b.Order) return 1;
		else return 0;
	}
}
