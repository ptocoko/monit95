import { Pipe, PipeTransform } from '@angular/core';
import { ReportModel } from '../rsur/reports/report-list/report.model';

@Pipe({
	name: 'testNameFilter'
})
export class TestIdPipe implements PipeTransform {
    transform(results: ReportModel[], testName: string): ReportModel[] {		
		if (testName && testName !== 'Все блоки') {
		    const res = results.filter((s: ReportModel) => s.TestNameWithDate === testName);
		    return res;
		} else {
			return results;
		}
	}
}
