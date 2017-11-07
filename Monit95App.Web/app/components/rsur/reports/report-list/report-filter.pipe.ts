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

@Pipe({ name: 'testNameFilter' })
export class TestIdPipe implements PipeTransform {
    transform(results: ReportModel[], testName: string): ReportModel[] {
        if (testName && testName !== 'Все блоки') {
            const res = results.filter((s: ReportModel) => s.TestNameWithDate === testName);
            return res;
        } else {
            return results;
        }
    }
}

@Pipe({ name: 'rsurParticipFilter' })
export class RsurParticipFilterPipe implements PipeTransform {
    transform(particips: any, searchText: any): any {
        if (searchText == null) return particips;
        return particips.filter((particip: any) => {
            if (particip.Surname) {
                return particip.Code.toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    || particip.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            }
            else if (particip.SchoolParticipInfo.Surname) {
                return particip.Code.toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            }
            else if (particip.RsurParticipCode) {
                return particip.RsurParticipCode.toString().indexOf(searchText) > -1;
            }
            else {
                throw Error('something went wrong in rsurParticipFilter pipe');
            }
        });
    }
}

@Pipe({ name: 'totalFilter' })
export class TotalFilterPipe implements PipeTransform {
    transform(reports: ReportModel[], selectedSchool: string, selectedTest: string): ReportModel[] {
        if (selectedSchool === undefined || selectedTest === undefined) {
            return reports;
        }

        if (selectedSchool !== 'Все организации') {
            reports = reports.filter((report: ReportModel) => report.SchoolParticipInfo.SchoolName === selectedSchool);
        }
        if (selectedTest !== 'Все блоки') {
            reports = reports.filter((report: ReportModel) => report.TestNameWithDate === selectedTest);
        }

        return reports;       
    }
}