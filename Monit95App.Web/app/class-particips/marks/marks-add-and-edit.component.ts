import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { MarksService } from '';

import { BasicValidators } from '../../shared/basic-validators';

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
  
    marksAddAndEditModel = new MarksAddAndEditModel();
    formGroup: FormGroup;    

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly marksService: MarksService,        
    ) {
        this.formGroup = new FormGroup({
            "question1Mark": new FormControl('', [Validators.required, Validators.pattern('(^0$)|(0.5)|(0,5)|(^1$)|(^1.5$)|(^1,5$)')]),           
            "question2Mark": new FormControl('', Validators.pattern('(0)|(0.5)|(0,5)')),          
            "question3Mark": new FormControl('', Validators.pattern('(0)|(0.5)|(0,5)')),           
            "question4Mark": new FormControl('', Validators.pattern('(0)|(0.5)|(0,5)')),           
            "question5Mark": new FormControl('', [Validators.min(0), Validators.max(1)])           
        });
    }

    ngOnInit() {        
        var participTestId = this.activatedRoute.params.subscribe(params => {
            var participTestId = params['participTestId'];

            this.marksService.getMarksByParticipTestId(participTestId).subcribe(marksAddAndEditModel => {
                this.marksAddAndEditModel = marksAddAndEditModel as MarksAddAndEditModel;
            }
                )

            this.title = id ? 'Edit User' : 'New User';

            if (!id)
                return;

            this.usersService.getUser(id)
                .subscribe(
                user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this.router.navigate(['NotFound']);
                    }
                });
        });
    }

    submit() {
        const milliseconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
        this.particip.Birthday = new Date(milliseconds + 10800000);

        //this.particip.Birthday = this.newYear + '-' + this.newMonth + '-' + this.newDay;
        console.log(this.particip);

        this.rsurParticipService.createParticip(this.particip).
            subscribe(data => this.router.navigate(['rsurparticips']));
    }

    back() {
        this.router.navigate(['rsurparticips'])
    }

    classesChange(): void {
        this.classNumbersTouched = true;
        this.particip.ClassNumbers = '';
        const checkboxes = $('#classes').find(':checkbox:checked');
        checkboxes.each((index, element) => {
            this.particip.ClassNumbers += element.id + ';';
        });
        if (this.particip.ClassNumbers.length > 0) {
            this.particip.ClassNumbers = this.particip.ClassNumbers.slice(0, this.particip.ClassNumbers.length - 1);
        }
    }

    schoolIdFromValidator(): ValidatorFn {
        return (control: FormControl) => {
            let valid: boolean;

            if (this.radioValue === 0) {
                valid = false;
            }
            //if (this.radioValue === 0 || (this.radioValue === 1 && control.value)) {
            //	valid = true;
            //}
            //else {
            //	valid = false;
            //}

            //console.log(valid);
            return valid ? null : {
                validateSchoolIdFrom: {
                    valid: false
                }
            }
        }
    }
}
