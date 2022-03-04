import { PersonModel } from '../person.model';
import { QuestionResultModel } from './question-result.model';

export interface ProtocolPostModel extends PersonModel{
	ParticipTestId: number;
	QuestionResultsList: QuestionResultModel[];
	SubQuestionResults: QuestionResultModel[];
}