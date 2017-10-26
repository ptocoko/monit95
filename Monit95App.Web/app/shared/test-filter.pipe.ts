
import { Pipe, PipeTransform } from '@angular/core';
import { RsurResultModel } from "../rsur/results/rsur-result.model";

@Pipe({
	name: 'testIdFilter'
})
export class TestIdPipe implements PipeTransform {
	transform(results: RsurResultModel[], testId: number): RsurResultModel[] {	
		//console.log(results);
		//console.log(testId);
		//if (!results)
		//	return results;
		//return results.filter((f: any) => f.RsurTestId === testId);		

		if (testId && testId != 0) {
			let res: RsurResultModel[] = results.filter((s: RsurResultModel) => s.RsurTestId == testId);
			console.log('when testId is exist');
			console.log('testId is -> ' + testId);
			console.log('results is -> ' + JSON.stringify(res) + '\n');
			return res;
		}
		else {
			console.log('when testId isnt exist');
			console.log('results is -> ' + JSON.stringify(results) + '\n');
			return results;
		}
	}
}
