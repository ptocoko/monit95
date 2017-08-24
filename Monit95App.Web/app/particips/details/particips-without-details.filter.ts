import { Pipe, PipeTransform } from '@angular/core';
import { ParticipModel } from "../particip.model";
//import 'rxjs/Rx';

@Pipe({ name: 'participsWithoutDetails' })
export class ParticipsWithoutDetailsPipe implements PipeTransform {
	transform(particips: ParticipModel[], showOnlyWithoutDetails: boolean) {
		if (particips == null || showOnlyWithoutDetails == null) return particips;

		if (showOnlyWithoutDetails)
			return particips.filter((particip: ParticipModel) => particip.birthday == null || particip.classNumbers == null);
		else
			return particips;
	}
}