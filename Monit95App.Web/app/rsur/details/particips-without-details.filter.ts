import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticipModel } from "../rsur-particip.model";
//import 'rxjs/Rx';

@Pipe({ name: 'participsWithoutDetails' })
export class ParticipsWithoutDetailsPipe implements PipeTransform {
	transform(particips: RsurParticipModel[], showOnlyWithoutDetails: boolean) {
		if (particips == null || showOnlyWithoutDetails == null) return particips;

		if (showOnlyWithoutDetails)
			return particips.filter((particip: RsurParticipModel) => particip.birthday == null || particip.classNumbers == null);
		else
			return particips;
	}
}