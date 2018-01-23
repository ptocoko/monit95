import { Pipe, PipeTransform } from '@angular/core';
import { ParticipModel } from './models/particip.model';

@Pipe({ name: 'participFilter' })
export class ParticipFilterPipe implements PipeTransform {
	transform(particips: ParticipModel[], searchText: string): any {
		if (searchText == null) return particips;

		return particips.filter((particip: ParticipModel) => {
			let FIO = particip.Surname + particip.Name;
			return FIO.toLowerCase().indexOf(searchText.toLowerCase()) > -1
		});
	}
}