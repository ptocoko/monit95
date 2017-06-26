import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'participFilter' })
export class ParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;

        return particips.filter((particip: any) => particip.participCode.indexOf(searchText.toLowerCase()) > -1 ||
            particip.surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    }
}

//return particips.filter(function (particip: any) {
//    return particip.participCode.indexOf(searchText.toLowerCase()) > -1
//        || particip.surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
//})