
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'offset'
})
export class OffsetPipe implements PipeTransform {
	transform(values: any[], offset: number): any[] {
		if (!values || !offset) return values;

		return values.slice(offset, values.length)
	}
}
