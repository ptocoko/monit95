import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { SchoolService } from '../../school.service';
import { RsurParticipService } from '../rsurparticip.service';

import { BasicValidators } from '../../shared/basic-validators';

import { UniqFilter } from './uniqfilter.pipe';

export class AddRsurParticip {
    Code: number;
    Surname: string;
    Name: string;
    RsurSubjectCode: number;
    SchoolIdWithName: string;
    CategoryId: number;
    AreaCodeWithName: string;
    Birthday: Date;
    Experience: number;
    Phone: string;
    ClassNumbers: string;
    ActualCode: number;
    Email: string;
    SecondName?: string;
    SchoolIdFrom?: string;    
}

export class School {
    Id: string;
    SchoolIdWithName: string;
    AreaCodeWithName: string;
}

//export class Category {
//    Id: number;
//    Name: string;
//}

//export class RsurSubject {
//    Code: number;
//    Name: string;
//}

const CATEGORIES: any[] = [
    { Id: 0, Name: 'Без категории' },
    { Id: 1, Name: 'Первая категория' },
    { Id: 2, Name: 'Высшая категория' }
];

const RSURSUBJECTS: any[] = [
    { Code: 1, Name: 'Русский язык' },
    { Code: 2, Name: 'Математика' },
    { Code: 7, Name: 'История' }
];

@Component({
    selector: 'rsurparticip-add-form',
    templateUrl: './app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.html?v=${new Date().getTime()}',      
    styleUrls: ['./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.css']    
})
export class RsurParticipAddFormComponent implements OnInit {      
    particip = new AddRsurParticip();    
    formGroup: FormGroup;
    categories = CATEGORIES;
    rsurSubjects = RSURSUBJECTS;
	schools: School[] = [];
	schoolId: string;
	classNumbers: string;
    classNumbersTouched: boolean;
    newDay: number;
    newMonth: number;
    newYear: number;
    areaCodeWithNames: Array<any>;
    radioValue: number;

    constructor(        
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly rsurParticipService: RsurParticipService,
        private readonly schoolService: SchoolService
    ) {
        this.formGroup = new FormGroup({
            "surname": new FormControl('', Validators.required),
            "name": new FormControl('', Validators.required),
            "secondName": new FormControl('', Validators.minLength(3)),
            "experience": new FormControl('', [Validators.required, Validators.min(0), Validators.max(60)]),
            "email": new FormControl('', [
                Validators.required,
                BasicValidators.email
            ]),  
            "phone": new FormControl('', Validators.pattern('[0-9]{11}')),
            "categoryId": new FormControl(),
            "rsurSubjectCode": new FormControl('', Validators.required),
            "birthday": new FormControl(),
			"areaCodeWithName": new FormControl(),
			"schoolIdFrom": new FormControl('', this.schoolValidator())
        });       
    }

    ngOnInit() {   
        this.radioValue = 1;
        this.schoolService.getAll()
            .subscribe((response: Response) => {
                this.schools = response.json() as School[];
                this.areaCodeWithNames = this.schools.map(({ AreaCodeWithName }) => AreaCodeWithName);
                this.areaCodeWithNames = this.areaCodeWithNames.filter((el: any, index: any, array: any) => array.indexOf(el) === index);

                //let uniqueArray = value.filter(function (el, index, array) {
                //    return array.indexOf(el) == index;
                //});
            });
    }

	submit() {
		let value = this.formGroup.value;
		let milliseconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);

		value.birthday = new Date(milliseconds + 10800000);
		value.classNumbers = this.classNumbers;
		value.schoolId = '9999';
		console.log(value);
		this.rsurParticipService.createParticip(value).
            subscribe(data => this.router.navigate(['rsurparticips']));     
		
		
    }

    classesChange(): void {
        this.classNumbersTouched = true;
        this.classNumbers = '';
        const checkboxes = $('#classes').find(':checkbox:checked');
        checkboxes.each((index, element) => {
            this.classNumbers += element.id + ';';
        });
        if (this.classNumbers.length > 0) {
            this.classNumbers = this.classNumbers.slice(0, this.classNumbers.length - 1);            
        }
	}

	schoolValidator(): ValidatorFn {
		
		return (control: FormControl) => {
			let valid: boolean;
			
			if (this.radioValue == 0 || (this.radioValue == 1 && control.value)) {
				valid = true;
			}
			else {
				valid = false;
			}
			console.log(valid)
			return valid ? null : {
				validateSchool: {
					valid: false
				}
			}
		}
	}
}
