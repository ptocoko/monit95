import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticip } from './rsurparticip';

@Pipe({name: 'rsurIsShowNotActual'})
export class RsurShowNotActualParticips implements PipeTransform {
    transform(particips: RsurParticip[], isShowNotActual: boolean) {
        if (isShowNotActual) return particips;

        else {
            return particips.filter((particip: RsurParticip) => particip.ActualCode === 1);
        }
    }
}