import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticip } from "./rsurparticip";

@Pipe({ name: 'rsurParticipFilter' })
export class RsurParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;

		return particips.filter((particip: any) => {
			if (particip.Surname) {
				return particip.Code.toString().indexOf(searchText) > -1
					|| particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1
					|| particip.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
			}
			else if (particip.RsurParticipCode) {
				return particip.RsurParticipCode.toString().indexOf(searchText) > -1;
			}
			else {
				throw Error('something went wrong in rsurParticipFilter pipe');
			}
		});
    }
}

@Pipe({name: 'rsurIsShowNotActual'})
export class RsurShowNotActualParticips implements PipeTransform {
    transform(particips: RsurParticip[], isShowNotActual: boolean) {
        if (isShowNotActual) return particips;

        else {
            return particips.filter((particip: RsurParticip) => particip.ActualCode === 1);
        }
    }
}

//return particips.filter(function (particip: any) {
//    return particip.participCode.indexOf(searchText.toLowerCase()) > -1
//        || particip.surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
//})