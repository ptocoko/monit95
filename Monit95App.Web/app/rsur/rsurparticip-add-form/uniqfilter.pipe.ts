import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'uniqFilter',
    pure: false
})
@Injectable()
export class UniqFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {
        //if (!items || !filter) {
        //    return items;
        //}

        //var r: any;
        //r.filter(
        //// filter items array, items which match and return true will be kept, false will be filtered out
        //return items.filter(item => item.AreaCodeWithName.indexOf(filter.Area) !== -1);
    }
}