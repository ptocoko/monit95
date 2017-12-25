import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticipModel } from '../models/rsur-particip.model';

@Pipe({ name: 'rsurParticipActualFilter' })
export class RsurParticipActualFilterPipe implements PipeTransform {
    transform(particips: RsurParticipModel[], isShowNotActual: boolean) {
        if (isShowNotActual == false) {
            return particips.filter((particip: any) => {
                return particip.ActualCode === 1
            });
        }
        return particips;
    }
}

@Pipe({ name: 'rsurParticipFilter' })
export class RsurParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: string): any {
        if (!searchText) {
            return particips;
		}

		let codePropertyName: string;
		if (particips[0].Code) {
			codePropertyName = 'Code';
		}
		else if (particips[0].RsurParticipCode) {
			codePropertyName = 'RsurParticipCode';
		}
		else {
			throw Error(`Can't find particip code property`);
		}

        searchText = searchText.toLowerCase();
        particips = particips.filter((particip: any) => {
            // for particips.component.html
            if (particip.SchoolParticipInfo) {
				return particip[codePropertyName].toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
            }
            else if (particip.Surname) {
				return particip[codePropertyName].toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText) > -1
                    || particip.Name.toLowerCase().indexOf(searchText) > -1;
            }            
        });
        return particips;
    }
}