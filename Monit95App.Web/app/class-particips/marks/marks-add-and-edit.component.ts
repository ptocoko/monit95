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
    selector: 'marks-add-and-edit',
    templateUrl: `./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.html?v=${new Date().getTime()}`,
    styleUrls: ['./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.css']
})
export class MarksAddAndEditComponent implements OnInit {
	isUpdate: boolean;
	marksAddAndEditModel = new MarksAddAndEditModel();
	participTestId: number;
    formGroup: FormGroup;    

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly marksService: MarksService) { }

    ngOnInit() {        
        this.activatedRoute.params.subscribe(params => {
            this.participTestId = params['participTestId'];

			this.marksService.getMarksByParticipTestId(this.participTestId).subscribe((marksAddAndEditModel: Response) => {
				this.marksAddAndEditModel = marksAddAndEditModel.json() as MarksAddAndEditModel;

				this.isUpdate = this.marksAddAndEditModel.Question1Mark != null;

				this.formGroup = new FormGroup({
					"question1Mark": new FormControl(this.marksAddAndEditModel.Question1Mark, [Validators.required, Validators.pattern('^(0|0.5|0,5|1|1.5|1,5|2|2.5|2,5|3|3.5|3,5|4)$')]),
					"question2Mark": new FormControl(this.marksAddAndEditModel.Question2Mark, [Validators.pattern('^(0|0.5|0,5|1)$'), Validators.required]),
					"question3Mark": new FormControl(this.marksAddAndEditModel.Question3Mark, [Validators.pattern('^(0|1|2|3)$'), Validators.required]),
					"question4Mark": new FormControl(this.marksAddAndEditModel.Question4Mark, [Validators.pattern('^(0|0.5|0,5|1)$'), Validators.required]),
					"question5Mark": new FormControl(this.marksAddAndEditModel.Question5Mark, [Validators.pattern('^(0|1)$'), Validators.required])
				});
			});
        });
    }

    submit() {
		let marksString = `${this.marksAddAndEditModel.Question1Mark};${this.marksAddAndEditModel.Question2Mark};${this.marksAddAndEditModel.Question3Mark};${this.marksAddAndEditModel.Question4Mark};${this.marksAddAndEditModel.Question5Mark};`;

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
