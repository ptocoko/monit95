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
	testDate: Date = new Date(2017, 8, 17);

	constructor(private resultService: ResultsService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participTestId: number = params['participTestId'];

			this.resultService.getClassParticipResult(participTestId).subscribe(res => this.particip = res);
		});

		
	}

	download() {
		let element = document.getElementById('classParticip-reportContainer');
		let doc = new jsPDF('p', 'pt', 'a4');

		doc.addHTML(element, 20, 20, {'width': 750}, () => {
			doc.save(this.particip.Fio);
		});
	}
}