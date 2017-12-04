import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limitTo' })
export class LimitToPipe implements PipeTransform {
	transform(array: any, limit: number) {
		if (limit == null || array == null) return array;

		return array.slice(0, limit);
	}
}