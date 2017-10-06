import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MarksService } from "./marks.service";

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

	marksInputs: JQuery<HTMLInputElement>;

	constructor(private readonly route: ActivatedRoute,
				private readonly router: Router,
				private readonly marksService: MarksService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participId = params['participId'];

			this.marksService.getMarksByRsurParticipId(participId).subscribe(res => {
				this.rsurParticip = res;
				this.marks = res.Marks ? res.Marks.split(';') : new Array<string>(res.MarkNames.length);

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

	}

	getCurrentMarksArray() {
		console.log(this.marks);
	}
}