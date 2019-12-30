import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RsurReportModel } from '../../../../models/rsur-report.model';
import { RsurReportService } from '../../../../services/rsur-report.service';

@Component({
    selector: 'report',    
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
	reportData: RsurReportModel;
	isWarnAboutGeoKimFail: boolean = false;
	isWarnAboutGeoKimFail_2 = false;
	isSocietyKimFail: boolean = false;

    constructor(private readonly reportService: RsurReportService,
				private readonly router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
		    const code: number = params['id'];
            this.reportService.getReport(code).subscribe(res => {
				this.reportData = res;
				this.needToWarn();
            });
		});
	}

	getGradeColor(grade100: number, rsurQuestionsCount: number): GradeLevel {
		//if (["0104", "0801"].indexOf(this.reportData.TestNumberCode) > -1 && this.reportData.RsurTestId > 2141 && this.reportData.RsurTestId < 3180) {
		//	return grade100 < 50 ? 'low-grade' : grade100 < 80 ? 'medium-grade' : 'high-grade';
		//} else if (this.reportData.RsurTestId === 2152 || this.reportData.RsurTestId === 2155) {
		//	return grade100 > 70 ? 'high-grade' : 'low-grade';
		//} else {
		//	if (grade100 < 60) {
		//		return 'low-grade';
		//	} else if (grade100 > 59 && grade100 < 81) {
		//		return 'medium-grade';
		//	} else {
		//		return 'high-grade';
		//	}
		//}
		if (this.reportData.TestNumberCode.substr(0, 2) === "03") {
			if (grade100 > 79) {
				return 'high-grade';
			}

			if (this.reportData.Grade5 === 5) {
				return 'medium-grade';
			} else {
				return 'low-grade';
			}
		}

		const midPercent = rsurQuestionsCount <= 2 ? 50 : 60;
		const highPercent = this.reportData.RsurTestId === 3185 ? 80 : 81;

		if (grade100 < midPercent) {
			return 'low-grade';
		} else if (grade100 >= midPercent && grade100 < highPercent) {
			return 'medium-grade';
		} else {
			return 'high-grade';
		}
	}

	needToWarn() {
		if (this.reportData.RsurTestId === 2153 && this.reportData.EgeQuestionResults.filter(f => [26, 27].indexOf(f.EgeQuestionNumber) > -1 && f.Value < 100).length > 0) {
			this.isWarnAboutGeoKimFail = true;
		}

		if (this.reportData.RsurTestId === 3184 && this.reportData.EgeQuestionResults.filter(f => f.EgeQuestionNumber === 17 && f.Value < 100).length > 0) {
			this.isWarnAboutGeoKimFail_2 = true;
		}
	}
}

type GradeLevel = 'low-grade' | 'medium-grade' | 'high-grade';
