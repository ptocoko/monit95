﻿import { Component, OnInit } from '@angular/core';
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
	rsurParticip: RsurParticipMarks = new RsurParticipMarks();
	marks: string[];
	markNames: string[];
	isUpdate: boolean;
	isAbsent: boolean;

	marksInputs: JQuery<HTMLInputElement>;

	constructor(private readonly route: ActivatedRoute,
				private readonly location: Location,
				private readonly marksService: MarksService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participTestId = params['participTestId'];
			
			this.marksService.getMarksByRsurParticipTestId(participTestId).subscribe(res => {
				this.rsurParticip = res.json() as RsurParticipMarks;
				this.markNames = this.rsurParticip.MarkNames;

				if (this.rsurParticip.Marks) {
					this.marks = this.rsurParticip.Marks.split(';');
					this.isUpdate = true;
					if (this.marks[0] === 'X') {
						this.isAbsent = true;
					}
				}
				else {
					this.marks = new Array<string>(this.markNames.length);
					this.isUpdate = false;
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

	setAbsentStatus() {
		//TODO: realize that!!
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

	cancel() {
		this.location.back();
	}
}