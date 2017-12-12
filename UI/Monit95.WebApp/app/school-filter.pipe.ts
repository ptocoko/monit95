import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'schoolFilter' })
export class SchoolFilter implements PipeTransform {
    transform(schools: any, areaCodeWithName: any): any {
        if (schools == null) return schools;

        return schools.filter((school: any) => school.AreaCodeWithName === areaCodeWithName);
    }
}