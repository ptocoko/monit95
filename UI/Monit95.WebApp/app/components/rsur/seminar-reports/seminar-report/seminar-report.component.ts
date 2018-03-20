
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { SeminarReportEdit, SeminarFile } from '../shared/seminar-report.model';
import { Location } from '@angular/common';
import { AccountService } from "../../../../services/account.service";
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'seminar-report',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report/seminar-report.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportComponent implements OnInit {
	report: SeminarReportEdit;
	//photoKeys: string[];
	isLoading: boolean;
	viewingImage: SeminarFile;

	constructor(private route: ActivatedRoute,
				private seminarReportService: SeminarReportService) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			let rsurReportId = params['id'];

			this.seminarReportService.getReport(rsurReportId).subscribe(res => {
				this.report = res;
				//this.photoKeys = this.report.SeminarFiles.map(sf => sf.Key).filter(f => f.includes('image'));
				this.isLoading = false;

				// пролистывание фотографий в режиме просмотра
				Observable.fromEvent(document, 'keydown')
					.filter((e: any) => [37, 39, 27].indexOf(e.keyCode) >= 0 && this.viewingImage != null)
					.subscribe(this.keyUpHandler.bind(this))
			});
		})
	}

	getPreviewer(seminarFile: SeminarFile): string {
		if (seminarFile.Type === 'image') {
			return 'data:image/png;base64,' + seminarFile.FileSourceString;
		} else {
			return '/images/pdf-previewer.png';
		}
	}

	showViewer(seminarFile: SeminarFile) {
		if (seminarFile.Type === 'image')
			this.viewingImage = seminarFile;
		else {
			this.openPdf(seminarFile);
		}
	}

	hideViewer() {
		this.viewingImage = null;
	}

	hasPrevImg() {
		if (this.viewingImage) {
			if (this.report.SeminarFiles.filter(f => f.Type === 'image').indexOf(this.viewingImage) === 0) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	hasNextImg() {
		if (this.viewingImage) {
			if (this.report.SeminarFiles.indexOf(this.viewingImage) === this.report.SeminarFiles.length - 1) {
				return false;
			}
			return true;
		}
		return false;
	}

	showPrevImg() {
		const indexOfViewingPhoto = this.report.SeminarFiles.indexOf(this.viewingImage);
		
		this.viewingImage = this.report.SeminarFiles[indexOfViewingPhoto - 1];
		return;
	}

	showNextImg() {
		const indexOfViewingPhoto = this.report.SeminarFiles.indexOf(this.viewingImage);

		this.viewingImage = this.report.SeminarFiles[indexOfViewingPhoto + 1];
		return;
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

	private openPdf(seminarFile: SeminarFile) {
		var objbuilder = '';
		objbuilder += ('<object width="100%" height="100%" data= "data:application/pdf;base64,');
		objbuilder += (seminarFile.FileSourceString);
		objbuilder += ('" type="application/pdf" class="internal">');
		objbuilder += ('<embed src="data:application/pdf;base64,');
		objbuilder += (seminarFile.FileSourceString);
		objbuilder += ('" type="application/pdf"  />');
		objbuilder += ('</object>');

		var win = window.open("#", "_blank");
		var title = seminarFile.Key;
		win.document.write('<html><title>' + title + '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">');
		win.document.write(objbuilder);
		win.document.write('</body></html>');
	}
}
