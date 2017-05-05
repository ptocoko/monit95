import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'particip' })

export class ParticipPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;

        return particips.filter(function (particip) {
            return particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        })
    }
}