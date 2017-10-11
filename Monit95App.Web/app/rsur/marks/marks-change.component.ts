import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MarksService, Marks } from "./marks.service";
import { Location } from '@angular/common';

export class RsurParticipMarks {
	ParticipTestId: number;
	Fio: string;
	TestNumberCodeWithName: string;
	MarkNames?: string[];
	Marks?: string;
}

@Component({
	templateUrl: `./app/rsur/marks/marks-change.component.html?v=${new Date().getTime()}`
})
export class RsurParticipMarksChange implements OnInit {
	rsurParticip: RsurParticipMarks;
	marks: string[];
	isUpdate: boolean;

	marksInputs: JQuery<HTMLInputElement>;

	constructor(private readonly route: ActivatedRoute,
				private readonly location: Location,
				private readonly marksService: MarksService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participTestId = params['participTestId'];

			this.marksService.getMarksByRsurParticipTestId(participTestId).subscribe(res => {
				this.rsurParticip = res.json() as RsurParticipMarks;
				if (this.rsurParticip.Marks) {
					this.marks = this.rsurParticip.Marks.split(';');
					this.isUpdate = false;
				}
				else {
					this.marks = new Array<string>(this.rsurParticip.MarkNames.length);
					this.isUpdate = true;
				}

				$(document).ready(() => {
					this.marksInputs = $('.markInput') as JQuery<HTMLInputElement>;
					this.marksInputs.get(0).focus();
					this.marksInputs.get(0).select();

					this.marksInputs.focus((event) => event.target.select());
				});
			});
		});

		
	}

	onMarkChanged(event: any) {
		let elem = event.target as HTMLInputElement;
		let elemIndex = this.marksInputs.index(elem);

		if (elem.value) {
			if (elem.value.match(/^(1|0)$/)) {
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
			
			else {
				elem.value = '1';
				this.marks[elemIndex] = '1'
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
		}
	}

	goToNextInputOrFocusOnSubmitBtn(elemIndex: number) {
		if (elemIndex < this.marksInputs.length - 1) {
			let nextInput = this.marksInputs.get(elemIndex + 1);
			nextInput.focus();
		}
		else {
			$('#submitBtn').focus();
		}
	}

	onSubmit() {
		let rsurParticipUpload: Marks = {
			participTestId: this.rsurParticip.ParticipTestId,
			marks: this.marks.join(';')
		};

		if (this.isUpdate) {
			this.marksService.updateRsurMarks(rsurParticipUpload).subscribe(res => this.location.back());
		}
		else {
			this.marksService.addRsurMarks(rsurParticipUpload).subscribe(res => this.location.back());
		}
	}

	getCurrentMarksArray() { //this is method for tests and should be removed after tests
		console.log(this.marks);
	}
}