import { Pipe, PipeTransform } from '@angular/core';
import { RsurReportModel } from '../models/rsur-report.model';

@Pipe({ name: 'testNameWithDateFilter' })
export class TestNameWithDateFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], schoolName: string, examName: string): string[] {
		//let results = [...reports]; 
		if (!reports) {
			return [];
		}
		if (schoolName && schoolName !== 'Все организации') {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (examName && examName !== 'Все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === examName);
		}
		return reports.map((report: RsurReportModel) => report.TestNameWithDate).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    }
}

@Pipe({ name: 'schoolNameFilter' })
export class SchoolNameFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], testNameWithDate: string, examName: string): string[] {
		//let results = [...reports];
		if (!reports) {
			return [];
		}
		if (examName && examName !== 'Все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === examName);
		}
		if (testNameWithDate && testNameWithDate !== 'Все блоки') {
			reports = reports.filter((report: RsurReportModel) => report.TestNameWithDate === testNameWithDate);
		}
		return reports.map((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
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

@Pipe({ name: 'examNameFilter' })
export class ExamNameFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], schoolName: string, testNameWithDate: string) {
		//let results = [...reports];
		if (!reports) {
			return [];
		}
		if (schoolName && schoolName !== 'Все организации') {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (testNameWithDate && testNameWithDate !== 'Все блоки') {
			reports = reports.filter((report: RsurReportModel) => report.TestNameWithDate === testNameWithDate);
		}
		return reports.map((report: RsurReportModel) => report.ExamName).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
	}
}

@Pipe({ name: 'totalFilter' })
export class TotalFilterPipe implements PipeTransform {
    transform(reports: RsurReportModel[], selectedSchool: string, selectedTest: string, selectedExam: string): RsurReportModel[] {
        if (selectedSchool === undefined || selectedTest === undefined || selectedExam === undefined) {
            return reports;
        }

        if (selectedSchool !== 'Все организации') {
            reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === selectedSchool);
        }
        if (selectedTest !== 'Все блоки') {
            reports = reports.filter((report: RsurReportModel) => report.TestNameWithDate === selectedTest);
		}
		if (selectedExam !== 'Все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === selectedExam);
		}

        return reports;       
    }
}