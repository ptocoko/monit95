import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'participFilter' })

export class ParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;

        return particips.filter(function (particip: any) {
            return particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        })
    }
}