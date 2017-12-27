import { Pipe, PipeTransform } from '@angular/core';
import { RsurReportModel } from '../models/rsur-report.model';

@Pipe({ name: 'testNameWithDateFilter' })
export class TestNameWithDateFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], schoolName: string, examName: string): string[] {
		//let results = [...reports]; 
		if (!reports) {
			return [];
		}
		if (schoolName && schoolName !== 'все организации') {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (examName && examName !== 'все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === examName);
		}
		return reports.map((report: RsurReportModel) => report.TestName)
			.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
			.sort();
    }
}

@Pipe({ name: 'schoolNameFilter' })
export class SchoolNameFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], testNameWithDate: string, examName: string): string[] {
		//let results = [...reports];
		if (!reports) {
			return [];
		}
		if (examName && examName !== 'все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === examName);
		}
		if (testNameWithDate && testNameWithDate !== 'все блоки') {
			reports = reports.filter((report: RsurReportModel) => report.TestName === testNameWithDate);
		}
		return reports.map((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    }
}

@Pipe({ name: 'testNameFilter' })
export class TestIdPipe implements PipeTransform {
    transform(results: RsurReportModel[], testName: string): RsurReportModel[] {
        if (testName && testName !== 'все блоки') {
            const res = results.filter((s: RsurReportModel) => s.TestName === testName);
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
		if (schoolName && schoolName !== 'все организации') {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (testNameWithDate && testNameWithDate !== 'все блоки') {
			reports = reports.filter((report: RsurReportModel) => report.TestName === testNameWithDate);
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

        if (selectedSchool !== 'все организации') {
            reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === selectedSchool);
        }
        if (selectedTest !== 'все блоки') {
            reports = reports.filter((report: RsurReportModel) => report.TestName === selectedTest);
		}
		if (selectedExam !== 'все диагностики') {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === selectedExam);
		}

        return reports;       
    }
}