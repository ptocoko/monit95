
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { SeminarReportModel } from '../shared/seminar-report.model';
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
	report: SeminarReportModel;
	photoKeys: string[];
	isLoading: boolean;
	viewingImageKey: string;

	mouseMove$: any;
	mouseClick$: any;

	@ViewChild('prevBtn') prevBtn: ElementRef;
	@ViewChild('imageViewer') imageViewer: ElementRef;

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
				
			});
		})
	}

	showViewer(imageKey: string) {
		this.viewingImageKey = imageKey;
		//this.mouseMove$ = Observable.fromEvent(document, 'mousemove')
		//	.subscribe(this.mouseMoveHandler);

		//this.mouseClick$ = Observable.fromEvent(document, 'click')
		//	.subscribe(this.mouseClickHandler);
	}

	hideViewer() {
		this.viewingImageKey = null;
		//this.mouseMove$.unsubscribe();
		//this.mouseClick$.unsubscribe();
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

	//mouseMoveHandler(event: MouseEvent) {
	//	const mouseRelativePos = event.pageX / event.view.innerWidth;
	//	if (mouseRelativePos < 0.2) {
	//		$('.fa-angle-left').addClass('active-btn');
	//	} else {
	//		$('.fa-angle-left').removeClass('active-btn');
	//	}

	//	if (mouseRelativePos > 0.8) {
	//		$('.fa-angle-right').addClass('active-btn');
	//	} else {
	//		$('.fa-angle-right').removeClass('active-btn');
	//	}
	//}

	//mouseClickHandler(event: MouseEvent) {
	//	const mouseRelativePos = event.pageX / event.view.innerWidth;
	//	if (mouseRelativePos < 0.2) {
	//		if (this.hasPrevImg()) {
	//			this.showPrevImg();
	//		}
	//	}
	//	if (mouseRelativePos > 0.8) {
	//		if (this.hasNextImg()) {
	//			this.showNextImg();
	//		}
	//	}
	//}
}
