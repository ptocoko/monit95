import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
            "rsurSubjectCode": new FormControl(),
            "birthday": new FormControl(),
            "areaCodeWithName": new FormControl()
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
                console.log(this.areaCodeWithNames);
            });
    }

    save() {
        this.rsurParticipService.createParticip(this.formGroup.value).
            subscribe(data => this.router.navigate(['rsurparticips']));        
    }

    classesChange(): void {
        console.log(this.particip.ClassNumbers);
        this.classNumbersTouched = true;
        this.particip.ClassNumbers = '';
        const checkboxes = $('#classes').find(':checkbox:checked');
        checkboxes.each((index, element) => {
            this.particip.ClassNumbers += element.id + ';';
        });
        if (this.particip.ClassNumbers.length > 0) {
            this.particip.ClassNumbers = this.particip.ClassNumbers.slice(0, this.particip.ClassNumbers.length - 1);            
        }

        console.log(this.particip.ClassNumbers);
    }
}
