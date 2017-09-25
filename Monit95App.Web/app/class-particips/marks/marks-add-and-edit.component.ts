import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { BasicValidators } from '../../shared/basic-validators';
import { MarksService, Marks } from "../../rsur/marks/marks.service";

export class MarksAddAndEditModel {
    ParticipTestId: number;
	Fio: string;
    Question1Mark: string;
    Question2Mark: string;
    Question3Mark: string;
    Question4Mark: string;
    Question5Mark: string;  
}

@Component({
    templateUrl: `./app/class-particips/marks/marks-add-and-edit.component.html?v=${new Date().getTime()}`
})
export class MarksAddAndEditComponent implements OnInit {
	isUpdate: boolean;
	marksAddAndEditModel = new MarksAddAndEditModel();
	participTestId: number;
    formGroup: FormGroup;    

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
		private readonly marksService: MarksService) {
		this.formGroup = new FormGroup({
			"question1Mark": new FormControl('', [Validators.required, Validators.pattern('^(0|0.5|0,5|1|1.5|1,5|2|2.5|2,5|3|3.5|3,5|4)$')]),
			"question2Mark": new FormControl('', [Validators.pattern('^(0|0.5|0,5|1)$'), Validators.required]),
			"question3Mark": new FormControl('', [Validators.pattern('^(0|1|2|3)$'), Validators.required]),
			"question4Mark": new FormControl('', [Validators.pattern('^(0|0.5|0,5|1)$'), Validators.required]),
			"question5Mark": new FormControl('', [Validators.pattern('^(0|1)$'), Validators.required])
		});
	}

    ngOnInit() {        
        this.activatedRoute.params.subscribe(params => {
            this.participTestId = params['participTestId'];

			this.marksService.getMarksByParticipTestId(this.participTestId).subscribe((marksAddAndEditModel: Response) => {
				this.marksAddAndEditModel = marksAddAndEditModel.json() as MarksAddAndEditModel;

				this.isUpdate = this.marksAddAndEditModel.Question1Mark != null;
			});
        });
    }

    submit() {
		let marksString = `${this.marksAddAndEditModel.Question1Mark.replace(',', '.')}; ${this.marksAddAndEditModel.Question2Mark.replace(',', '.')}; ${this.marksAddAndEditModel.Question3Mark.replace(',', '.')}; ${this.marksAddAndEditModel.Question4Mark.replace(',', '.')}; ${this.marksAddAndEditModel.Question5Mark.replace(',', '.')}`;

		let marksDto: Marks = {
			participTestId: this.participTestId,
			marks: marksString
		};

		if (this.isUpdate) {
			this.marksService.updateMarks(marksDto);
			this.router.navigate(['/class-particips/marks']);
		} else {
			this.marksService.addMarks(marksDto);
			this.router.navigate(['/class-particips/marks']);
		}
    }

    back() {
		this.router.navigate(['/class-particips/marks']);
    }
}
