
import { Pipe, PipeTransform } from '@angular/core';
import { RsurResultModel } from "../rsur/results/rsur-result.model";

@Pipe({
	name: 'testNameFilter'
})
export class TestIdPipe implements PipeTransform {
	transform(results: RsurResultModel[], testName: string): RsurResultModel[] {	
		//console.log(results);
		//console.log(testId);
		//if (!results)
		//	return results;
		//return results.filter((f: any) => f.RsurTestId === testId);		

		if (testName && testName != 'Все блоки') {
			let res: RsurResultModel[] = results.filter((s: RsurResultModel) => s.TestNameWithDate == testName);
			return res;
		}
		else {
			return results;
		}
	}
}
