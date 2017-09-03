import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticip as RsurParticipModel } from "../rsurparticip";
//import 'rxjs/Rx';

@Pipe({ name: 'participsWithoutDetails' })
export class ParticipsWithoutDetailsPipe implements PipeTransform {
	transform(particips: RsurParticipModel[], showOnlyWithoutDetails: boolean) {
		if (particips == null || showOnlyWithoutDetails == null) return particips;

		if (showOnlyWithoutDetails)
			return particips.filter((particip: RsurParticipModel) => particip.Birthday == null || particip.ClassNumbers == null);
		else
			return particips;
	}
}