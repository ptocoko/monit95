import { Component, OnInit } from '@angular/core';
import { ResultsService } from "../../shared/results.service";
import { ActivatedRoute } from '@angular/router';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

export class ClassParticipResult {
	public Fio: string;
	public ClassName: string;
	public SchoolName: string;
	public PrimaryMark: number;
	public GradeGroup: string;
	public Marks: string[];
}

const MAX_MARKS = [4, 1, 3, 1, 1];

@Component({
	templateUrl: `./app/class-particips/results/results.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/class-particips/results/results.component.css?v=${new Date().getTime()}`]
})
export class ClassParticipResultsComponent implements OnInit {
	maxMarks: number[] = MAX_MARKS;
	particip: ClassParticipResult;
	testDate: string = "17 Сентября, 2017 г.";

	constructor(private resultService: ResultsService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participTestId: number = params['participTestId'];

			this.resultService.getClassParticipResult(participTestId).subscribe(res => this.particip = res as ClassParticipResult);
		});

		
	}

	download() {
		//let element = document.getElementById('classParticip-reportContainer');
		let doc = new jsPDF('p', 'pt', 'a4');
		html2canvas($('.classParticip-reportContainer').get(0), {background: '#fff'}).then(canvas => {
			document.body.appendChild(canvas);
			doc.addHTML(canvas, () => {
				document.body.removeChild(canvas);
				doc.save(this.particip.Fio + '.pdf');
			});
		});
	}
}