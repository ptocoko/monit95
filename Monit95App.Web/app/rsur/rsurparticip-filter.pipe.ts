import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rsurParticipFilter' })
export class RsurParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;

		return particips.filter((particip: any) => particip.Code.toString().indexOf(searchText) > -1);
    }
}

//return particips.filter(function (particip: any) {
//    return particip.participCode.indexOf(searchText.toLowerCase()) > -1
//        || particip.surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
//})