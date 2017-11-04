import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subjectFilter' })
export class SubjectFilterPipe implements PipeTransform {
    transform(ratings: any[], selectedSubject: string): any {
        if (selectedSubject !== undefined) {
            ratings = ratings.filter((item: any) => item.SubjectName === selectedSubject);
        }

        return ratings;
    }
}