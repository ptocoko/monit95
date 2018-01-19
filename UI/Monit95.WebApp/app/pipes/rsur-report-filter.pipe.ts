import { Pipe, PipeTransform } from '@angular/core';
import { RsurReportModel } from '../models/rsur-report.model';
import { SCHOOLNAME_DEFAULT_SELECTION, TESTNAME_DEFAULT_SELECTION, EXAMNAME_DEFAULT_SELECTION } from '../components/rsur/reports/report-list/report-list.component';

@Pipe({ name: 'testNameWithDateFilter' })
export class TestNameWithDateFilterPipe implements PipeTransform {
	transform(reports: RsurReportModel[], schoolName: string, examName: string): string[] {
		if (!reports) {
			return [];
		}
		if (schoolName && schoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (examName && examName !== EXAMNAME_DEFAULT_SELECTION) {
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
		if (!reports) {
			return [];
		}
		if (examName && examName !== EXAMNAME_DEFAULT_SELECTION) {
			reports = reports.filter((report: RsurReportModel) => report.ExamName === examName);
		}
		if (testNameWithDate && testNameWithDate !== TESTNAME_DEFAULT_SELECTION) {
			reports = reports.filter((report: RsurReportModel) => report.TestName === testNameWithDate);
		}
        return reports.map((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName) // select schoolNames
			.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // delete dublicates
			.sort((a, b) => a.substr(0, 4) < b.substr(0, 4) ? -1 : 1); // sort by schoolId
    }
}

@Pipe({ name: 'testNameFilter' })
export class TestIdPipe implements PipeTransform {
    transform(results: RsurReportModel[], testName: string): RsurReportModel[] {
		if (testName && testName !== TESTNAME_DEFAULT_SELECTION) {
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
		if (!reports) {
			return [];
		}
		if (schoolName && schoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
			reports = reports.filter((report: RsurReportModel) => report.SchoolParticipInfo.SchoolName === schoolName);
		}
		if (testNameWithDate && testNameWithDate !== TESTNAME_DEFAULT_SELECTION) {
			reports = reports.filter((report: RsurReportModel) => report.TestName === testNameWithDate);
		}
        return reports.map((report: RsurReportModel) => report.ExamName)
                      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
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