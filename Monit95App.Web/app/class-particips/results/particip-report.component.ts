import { Component, OnInit } from '@angular/core';
import { ResultsService } from "../../shared/results.service";
import { ActivatedRoute } from '@angular/router';

import { Http, ResponseContentType } from "@angular/http";

export class ClassParticipResult {
	public ParticipTestId: number;
	public Surname: string;
	public Name: string;
	public SecondName: string;
	public ClassName: string;
	public SchoolName: string;
	public PrimaryMark: number;
	public GradeGroup: string;
	public Marks: string[];
}

const MAX_MARKS = [4, 1, 3, 1, 1];

@Component({
	templateUrl: `./app/class-particips/results/particip-report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/class-particips/results/particip-report.component.css?v=${new Date().getTime()}`]
})
export class ClassParticipReportComponent implements OnInit {
	maxMarks: number[] = MAX_MARKS;
	participTestId: number;
	particip: ClassParticipResult;
	testDate: string = "26 сентября 2017 года";

	constructor(private resultService: ResultsService, private route: ActivatedRoute, private http: Http) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.participTestId = params['participTestId'];

			this.resultService.getClassParticipResultDto(this.participTestId).subscribe(res => this.particip = res as ClassParticipResult);
		});

		
	}

	getPrimaryMarkBgrd(primaryMark: number) {
		if (primaryMark <= 3) 
				return { 'red-background': true };
			else if(primaryMark > 3 && primaryMark <= 6)
				return { 'yellow-bgrd': true };
			else if(primaryMark > 6 && primaryMark <= 8)
				return { 'lightgreen-bgrd': true };
			else if(primaryMark > 8)
				return { 'green-bgrd': true };
			else
				throw new Error('Ошибка')
		
	}

	download() {
		this.http.get('/api/ResultReport/Get?participTestId=' + this.participTestId, { responseType: ResponseContentType.Blob }).subscribe(data => {
			var a = document.createElement("a");
			a.href = URL.createObjectURL(data.blob());
			a.download = `${this.particip.ClassName.replace(' ', '')}-${this.particip.Surname}-${this.particip.Name}`;
			a.click();
		})
	}
}