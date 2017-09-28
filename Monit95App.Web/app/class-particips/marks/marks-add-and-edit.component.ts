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
    wasNot: boolean;
	marksAddAndEditModel = new MarksAddAndEditModel();
	participTestId: number;
    formGroup: FormGroup;    

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
		private readonly marksService: MarksService) {
		this.formGroup = new FormGroup({
            "question1Mark": new FormControl({ disabled: true}, [Validators.required, Validators.pattern(/^(0|0\.5|0,5|1|1\.5|1,5|2|2\.5|2,5|3|3\.5|3,5|4)$/)]),
			"question2Mark": new FormControl('', [Validators.pattern(/^(0|0\.5|0,5|1)$/), Validators.required]),
			"question3Mark": new FormControl('', [Validators.pattern(/^(0|1|2|3)$/), Validators.required]),
			"question4Mark": new FormControl('', [Validators.pattern(/^(0|0\.5|0,5|1)$/), Validators.required]),
            "question5Mark": new FormControl('', [Validators.pattern(/^(0|1)$/), Validators.required])            
		});
	}

    ngOnInit() {
        this.wasNot = false;
        this.activatedRoute.params.subscribe(params => {
            this.participTestId = params['participTestId'];

			this.marksService.getMarksByParticipTestId(this.participTestId).subscribe((marksAddAndEditModel: Response) => {
                this.marksAddAndEditModel = marksAddAndEditModel.json() as MarksAddAndEditModel;

                if (this.marksAddAndEditModel.Question1Mark === 'X') {
                    this.marksAddAndEditModel.Question1Mark = '';
                    this.marksAddAndEditModel.Question2Mark = '';
                    this.marksAddAndEditModel.Question3Mark = '';
                    this.marksAddAndEditModel.Question4Mark = '';
                    this.marksAddAndEditModel.Question5Mark = '';
                    this.wasNot = true;
                }

				this.isUpdate = this.marksAddAndEditModel.Question1Mark != null;

			    $.ready.then(() => {
			        $('#question1Mark').focus().select();

			        $('#question1Mark').keypress((event) => {
			            if (event.keyCode === 13) {
			                $('#question2Mark').focus().select();
			            }
			        });

			        $('#question2Mark').keypress((event) => {
			            if (event.keyCode === 13) {
			                $('#question3Mark').focus().select();
			            }
			        });

			        $('#question3Mark').keypress((event) => {
			            if (event.keyCode === 13) {
			                $('#question4Mark').focus().select();
			            }
			        });

			        $('#question4Mark').keypress((event) => {
			            if (event.keyCode === 13) {
			                $('#question5Mark').focus().select();
			            }
			        });

			        $('#question5Mark').keypress((event) => {
			            if (event.keyCode === 13) {
			                $('#submitBtn').focus();
			            }
			        });
			    });
			});
        });
    }

    submit() {
        let marksString = '';		

        if (this.wasNot) {
            marksString = 'X;X;X;X;X';
        } else {
            marksString = `${this.marksAddAndEditModel.Question1Mark.replace(',', '.')};${this.marksAddAndEditModel.Question2Mark.replace(',', '.')};${this.marksAddAndEditModel.Question3Mark.replace(',', '.')};${this.marksAddAndEditModel.Question4Mark.replace(',', '.')};${this.marksAddAndEditModel.Question5Mark.replace(',', '.')}`;
        }

		const marksDto: Marks = {
		    participTestId: this.participTestId,
		    marks: marksString
		};
		console.log(this.isUpdate);
		console.log(marksDto);
		if (this.isUpdate) {
			this.marksService.updateMarks(marksDto).subscribe(res => {
				this.router.navigate(['/class-particips/marks']);
			});
		} else {
			this.marksService.addMarks(marksDto).subscribe(res => {
				this.router.navigate(['/class-particips/marks']);
			});
		}
    }

    back() {
		this.router.navigate(['/class-particips/marks']);
    }
}
