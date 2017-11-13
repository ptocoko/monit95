import { Pipe, PipeTransform } from '@angular/core';
import { RsurReportModel } from '../models/rsur-report.model';

@Pipe({ name: 'testNameWithDateFilter' })
export class TestNameWithDateFilterPipe implements PipeTransform {
    transform(reports: RsurReportModel[], schoolName: string): string[] {        
        let result: string[] = [];

        if (reports === undefined || schoolName === undefined || schoolName === 'Все организации') {
            result = reports.map((report: RsurReportModel) => report.TestNameWithDate);
        }
        else {            
            result = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName)
                .map((report: RsurReportModel) => report.TestNameWithDate);                                     
        }        
        return result.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);  
    }
}

@Pipe({ name: 'schoolNameFilter' })
export class SchoolNameFilterPipe implements PipeTransform {
    transform(reports: RsurReportModel[], testNameWithDate: string): string[] {
        let result: string[] = [];
        if (reports === undefined || testNameWithDate === undefined || testNameWithDate === 'Все блоки') {
            result = reports.map((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName);
        }
        else {
            result = reports.filter((report: RsurReportModel) => report.TestNameWithDate === testNameWithDate)
                .map((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName);

        }
        return result.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    }
}

@Pipe({ name: 'testNameFilter' })
export class TestIdPipe implements PipeTransform {
    transform(results: RsurReportModel[], testName: string): RsurReportModel[] {
        if (testName && testName !== 'Все блоки') {
            const res = results.filter((s: RsurReportModel) => s.TestNameWithDate === testName);
            return res;
        } else {
            return results;
        }
    }
}

@Pipe({ name: 'totalFilter' })
export class TotalFilterPipe implements PipeTransform {
    transform(reports: RsurReportModel[], selectedSchool: string, selectedTest: string): RsurReportModel[] {
        if (selectedSchool === undefined || selectedTest === undefined) {
            return reports;
        }

        if (selectedSchool !== 'Все организации') {
            reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === selectedSchool);
        }
        if (selectedTest !== 'Все блоки') {
            reports = reports.filter((report: RsurReportModel) => report.TestNameWithDate === selectedTest);
        }

        return reports;       
    }
}