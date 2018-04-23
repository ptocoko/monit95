import { Pipe, PipeTransform } from '@angular/core';
import { ParticipModel } from '../../models/one-two-three/particip.model';
import { ClassModel } from '../../models/class.model';

@Pipe({
	name: 'classFilter'
})
export class ClassFilterPipe implements PipeTransform {
	transform(particips: ParticipModel[], classId: string): ParticipModel[] {
		if (!classId || !particips || particips.length === 0) return particips;

		return particips.filter((particip) => particip.ClassId === classId);
	}
}

@Pipe({
	name: 'getClasses',
	pure: true
})
export class ClassesGetterPipe implements PipeTransform {
	transform(values: any[], ...args: any[]): ClassModel[] {
		if (!values || values.length === 0) return values;

		return values
			.map(val => { return { Name: val.ClassName, Id: val.ClassId } })
			.filter((value: ClassModel, index: number, self: ClassModel[]) => {
				return self.map(mapSelf => mapSelf.Id).indexOf(value.Id) === index;
			});
	}
}

@Pipe({
	name: 'participFilter'
})
export class ParticipFilterPipe implements PipeTransform {
	transform(particips: ParticipModel[], searchText: string) {
		if (!searchText || !particips || particips.length === 0) return particips;

		searchText = searchText.trim().toLowerCase();

		return particips.filter((particip: ParticipModel) => {
			return particip.Id.toString().indexOf(searchText) > -1
				|| particip.Surname.trim().toLowerCase().indexOf(searchText) > -1
				|| particip.Name.trim().toLowerCase().indexOf(searchText) > -1;
		});
	}

}