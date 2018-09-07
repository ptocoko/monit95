//import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
//import { Router, ActivatedRoute } from '@angular/router';
//import { Response } from '@angular/http';

//import { SchoolService } from '../../school.service';
//import { RsurParticipService } from '../../services/rsur-particip.service';

//import { BasicValidators } from '../../shared/basic-validators';

//export class AddRsurParticip {
//    Code: number;
//    Surname: string;
//    Name: string;
//    RsurSubjectCode: number;
//    SchoolIdWithName: string;
//    CategoryId: number;
//    AreaCodeWithName: string;
//    //Birthday: string;
//    Birthday: Date;
//    Experience: number;
//    Phone: string;
//    ClassNumbers: string;
//    ActualCode: number;
//    Email: string;
//    SecondName: string;
//    SchoolIdFrom: string;    
//}

//export class School {
//    Id: string;
//    SchoolIdWithName: string;
//    AreaCodeWithName: string;
//}

//const CATEGORIES: any[] = [
//    { Id: 0, Name: 'Без категории' },
//    { Id: 1, Name: 'Первая категория' },
//    { Id: 2, Name: 'Высшая категория' }
//];

//const RSURSUBJECTS: any[] = [
//    { Code: 1, Name: 'Русский язык' },
//    { Code: 2, Name: 'Математика' },
//    { Code: 7, Name: 'История' }
//];

//@Component({
//    selector: 'rsurparticip-add-form',
//    templateUrl: `./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.html?v=${new Date().getTime()}`,      
//    styleUrls: ['./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.css']    
//})
//export class RsurParticipAddFormComponent implements OnInit {      
//    particip = new AddRsurParticip();    
//    formGroup: FormGroup;
//    categories = CATEGORIES;
//    rsurSubjects = RSURSUBJECTS;
//	schools: School[] = [];
//	schoolId: string;	
//    classNumbersTouched: boolean;
//    newDay: number;
//    newMonth: number;
//    newYear: number;
//    areaCodeWithNames: Array<any>;
//    radioValue: number;
//    selectedArea: string;
//    selectedSchool: string;
//    tempB: boolean;

//    constructor(        
//        private readonly router: Router,
//        private readonly route: ActivatedRoute,
//        private readonly rsurParticipService: RsurParticipService,
//        private readonly schoolService: SchoolService
//    ) {
//        this.formGroup = new FormGroup({
//            "surname": new FormControl('', [Validators.required,
//                                            Validators.minLength(4),
//                                            Validators.maxLength(25)]),                                            
//            "name": new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
//            "secondName": new FormControl('', [Validators.minLength(4), Validators.maxLength(25)]),
//            "experience": new FormControl('', [Validators.required,
//                                               Validators.min(0),
//                                               Validators.max(60),
//                                               Validators.pattern('[0-9]+')]),
//            "email": new FormControl('', BasicValidators.emailOrEmpty),  
//            "phone": new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]),
//            "categoryId": new FormControl(),
//            "rsurSubjectCode": new FormControl(''),
//            "newday": new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
//            "newmonth": new FormControl('', Validators.required),
//            "newyear": new FormControl('', [Validators.required, Validators.min(1930), Validators.max(1999)]),
//			"areaCodeWithName": new FormControl(),
//			"schoolIdFrom": new FormControl()
//        });       
//    }

//    ngOnInit() {
//        this.particip.ClassNumbers = '';
//        this.particip.CategoryId = 0;
//        this.particip.RsurSubjectCode = 1;
//        this.particip.Email = '';
        
//        this.radioValue = 1;        
//        this.selectedSchool = '';
//        this.schoolService.getAll()
//            .subscribe((response: Response) => {
//                this.schools = response.json() as School[];
//                this.areaCodeWithNames = this.schools.map(({ AreaCodeWithName }) => AreaCodeWithName);
//                this.areaCodeWithNames = this.areaCodeWithNames.filter((el: any, index: any, array: any) => array.indexOf(el) === index
//                    && el !== '1000 - Fake Area');

//                this.areaCodeWithNames.push('Неизвестно');
//                this.areaCodeWithNames.sort();
//                this.selectedArea = 'Неизвестно';
//            });
//    }

//	submit() {		
//		const milliseconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
//	    this.particip.Birthday = new Date(milliseconds + 10800000);		

//	    //this.particip.Birthday = this.newYear + '-' + this.newMonth + '-' + this.newDay;
//	    console.log(this.particip);

//	    this.rsurParticipService.createParticip(this.particip).
//	              subscribe(() => this.router.navigate(['rsurparticips']));     				
//    }

//    back() {
//        this.router.navigate(['rsurparticips'])
//    }

//    classesChange(): void {
//        this.classNumbersTouched = true;
//        this.particip.ClassNumbers = '';
//        const checkboxes = $('#classes').find(':checkbox:checked');
//        checkboxes.each((index, element) => {
//            this.particip.ClassNumbers += element.id + ';';
//        });
//        if (this.particip.ClassNumbers.length > 0) {
//            this.particip.ClassNumbers = this.particip.ClassNumbers.slice(0, this.particip.ClassNumbers.length - 1);            
//        }
//	}

//    schoolIdFromValidator(): ValidatorFn {
//        return (control: FormControl) => {
//			let valid: boolean;

//            if (this.radioValue === 0) {
//                valid = false;
//            }
//            //if (this.radioValue === 0 || (this.radioValue === 1 && control.value)) {
//            //	valid = true;
//            //}
//            //else {
//            //	valid = false;
//            //}
            
//            //console.log(valid);
//            return valid ? null : {
//            	validateSchoolIdFrom: {
//            		valid: false
//            	}
//            }
//        }
//	}
//}
