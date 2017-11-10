import { Pipe, PipeTransform } from '@angular/core';
import { RsurParticipModel } from '../models/rsur-particip.model';

//@Pipe({name: 'rsurParticipFilter'})
//export class RsurParticipFilterPipe implements PipeTransform {
//    transform(particips: RsurParticipModel[], isShowNotActual: boolean) {
//        if (isShowNotActual) return particips;

//        else {
//            return particips.filter((particip: RsurParticipModel) => particip.ActualCode === 1);
//        }
//    }
//}

@Pipe({ name: 'rsurParticipFilter' })
export class RsurParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any, isShowNotActual?: boolean): any {
        if (searchText == null) {
            return particips;
        }
        searchText = searchText.toLowerCase();
        particips = particips.filter((particip: any) => {
            // for particips.component.html
            if (particip.Code) {
                return particip.Code.toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText) > -1
                    || particip.Name.toLowerCase().indexOf(searchText) > -1;
            }
            else if (particip.SchoolParticipInfo) {
                return particip.Code.toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
            }

            //if (isShowNotActual) {
            //    particips = particips.filter((particip: any) => {
            //        return particip.ActualCode === 0
            //    });
            //}

            //else if (particip.RsurParticipCode) {
            //    return particip.RsurParticipCode.toString().indexOf(searchText) > -1;
            //}                                               
        });
        return particips;
    }
}