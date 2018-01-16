
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { SeminarReportEdit } from '../shared/seminar-report.model';
import { Location } from '@angular/common';
import { AccountService } from "../../../../services/account.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';

@Component({
	selector: 'seminar-report',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportComponent implements OnInit {
	report: SeminarReportEdit;
	photoKeys: string[];
	isLoading: boolean;
	viewingImageKey: string;

	constructor(private router: Router, 
				private route: ActivatedRoute,
				private seminarReportService: SeminarReportService,
				private location: Location,
				private accountService: AccountService) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			let rsurReportId = params['id'];

			this.seminarReportService.getReport(rsurReportId).subscribe(res => {
				this.report = res;
				this.photoKeys = Object.keys(this.report.SeminarFiles).filter(f => f.includes('foto'));
				this.isLoading = false;
				Observable.fromEvent(document, 'keydown')
					.filter((e: any) => [37, 39, 27].indexOf(e.keyCode) >= 0 && this.viewingImageKey != null)
					.subscribe(this.keyUpHandler.bind(this))
			});
		})
	}

	showViewer(imageKey: string) {
		this.viewingImageKey = imageKey;
	}

	hideViewer() {
		this.viewingImageKey = null;
	}

	hasPrevImg() {
		if (this.viewingImageKey) {
			if (this.viewingImageKey === 'protocol') {
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	hasNextImg() {
		if (this.viewingImageKey) {
			if (this.photoKeys.indexOf(this.viewingImageKey) === this.photoKeys.length - 1) {
				return false;
			}
			return true;
		}
		return false;
	}

	showPrevImg() {
		const indexOfViewingPhoto = this.photoKeys.indexOf(this.viewingImageKey);
		if (indexOfViewingPhoto === 0) {
			this.viewingImageKey = 'protocol'
			return;
		} else {
			this.viewingImageKey = this.photoKeys[indexOfViewingPhoto - 1];
			return;
		}
	}

	showNextImg() {
		if (this.viewingImageKey === 'protocol') {
			this.viewingImageKey = this.photoKeys[0];
			return;
		} else {
			const indexOfViewingPhoto = this.photoKeys.indexOf(this.viewingImageKey);
			this.viewingImageKey = this.photoKeys[indexOfViewingPhoto + 1];
			return;
		}
	}

	keyUpHandler(e: KeyboardEvent) {
		if (e.keyCode === 37 && this.hasPrevImg()) {
			this.showPrevImg();
			return;
		}
		if (e.keyCode === 39 && this.hasNextImg()) {
			this.showNextImg();
			return;
		}
		if (e.keyCode === 27) {
			this.hideViewer();
			return;
		}
	}
}
