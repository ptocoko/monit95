import { TestModel } from '../../test.model';
import { SchoolModel } from '../../school.model';

export interface ReportsInfo {
	Tests: TestModel[];
	Schools: SchoolModel[];
}