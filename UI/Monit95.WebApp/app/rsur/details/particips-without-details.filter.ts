import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticipModel } from '../../models/rsur-particip.model';

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