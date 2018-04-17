import { Pipe, PipeTransform } from '@angular/core';
import { ParticipModel } from '../../models/one-two-three/particip.model';

@Pipe({
	name: 'class-filter'
})
export class ClassFilterPipe implements PipeTransform {
	transform(particips: ParticipModel[], classId: string): ParticipModel[] {
		if (!classId || !particips) return particips;

		return particips.filter((particip) => particip.ClassId === classId);
	}
}