import { Pipe, PipeTransform } from '@angular/core';
import { ReportModel } from './report.model'

@Pipe({ name: 'testNameWithDateFilter' })
export class TestNameWithDateFilterPipe implements PipeTransform {
    transform(reports: ReportModel[], schoolName: string): string[] {        
        let result: string[] = [];

        if (reports === undefined || schoolName === undefined || schoolName === 'Все организации') {
            result = reports.map((report: ReportModel) => report.TestNameWithDate);
        }
        else {            
            result = reports.filter((report: ReportModel) => report.SchoolParticipInfo.SchoolName === schoolName)
                .map((report: ReportModel) => report.TestNameWithDate);                                     
        }        
        return result.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);  
    }
}

@Pipe({ name: 'schoolNameFilter' })
export class SchoolNameFilterPipe implements PipeTransform {
    transform(reports: ReportModel[], testNameWithDate: string): string[] {
        let result: string[] = [];
        if (reports === undefined || testNameWithDate === undefined || testNameWithDate === 'Все блоки') {
            result = reports.map((report: ReportModel) => report.SchoolParticipInfo.SchoolName);
        }
        else {
            result = reports.filter((report: ReportModel) => report.TestNameWithDate === testNameWithDate)
                .map((report: ReportModel) => report.SchoolParticipInfo.SchoolName);

        }
        return result.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    }
}