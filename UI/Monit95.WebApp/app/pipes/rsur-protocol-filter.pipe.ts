import { Pipe, PipeTransform } from '@angular/core';
import { Protocol } from "../models/protocol.model";

@Pipe({
	name: 'rsurProtocolFilter',
	pure: false
})
export class RsurProtocolFilter implements PipeTransform{
	transform(array: Protocol[], searchText: any) {
		if (array && array.length > 1 && searchText) {
			return array.filter(f => f.ParticipCode.toString().indexOf(searchText) > -1);
		}
		return array;
	}
}