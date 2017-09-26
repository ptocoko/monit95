import { Pipe, PipeTransform } from '@angular/core';
import { ParticipWithMarks } from "../rsur/marks/marks.service";

@Pipe({ name: 'classNameFilter' })
export class ClassNameFilterPipe implements PipeTransform {
	transform(particips: ParticipWithMarks[], searchText: string): any {
		if (searchText === 'Все классы' || searchText == null) return particips;

		return particips.filter((particip: ParticipWithMarks) => particip.ClassName.trim() == searchText);
	}
}