import { Pipe, PipeTransform } from '@angular/core';
import { ParticipModel } from '../models/particip.model';

@Pipe({ name: 'participFilter' })
export class ParticipFilterPipe implements PipeTransform {
	transform(particips: ParticipModel[], searchText: string) {
		if (searchText == null) return particips;

		return particips.filter((particip: ParticipModel) => {
			//let FIO = particip.Surname + particip.Name + particip.DocumNumber;
			//return FIO.toLowerCase().indexOf(searchText.toLowerCase()) > -1
			return particip.Surname.trim().toLowerCase().indexOf(searchText) > -1
				|| particip.Name.trim().toLowerCase().indexOf(searchText) > -1
				|| particip.DocumNumber.toString().trim().toLowerCase().indexOf(searchText) > -1;
		});
	}
}