
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'testIdFilter'
})
export class TestIdPipe implements PipeTransform {
	transform(results: any, testId: any): any {	
		console.log(results);
		console.log(testId);
		if (!results)
			return results;
		return results.filter((f: any) => f.RsurTestId === testId);		
	}
}
