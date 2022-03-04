import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'classNameFilter' })
export class ClassNameFilterPipe implements PipeTransform {
	transform(particips: ClassParticip[], searchText: string): any {
		if (searchText === 'Все классы' || searchText == null) return particips;

		return particips.filter((particip: ClassParticip) => particip.ClassName.trim() == searchText);
	}
}

interface ClassParticip {
	ClassName: string;
}