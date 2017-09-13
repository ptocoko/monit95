import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RsurParticip } from '../rsurparticip';

import { RsurParticipService } from '../rsurparticip.service';
import { BasicValidators } from '../../shared/basic-validators';

export class AddRsurParticip {
    public Code: number;
    public Surname: string;
    public Name: string;
    public RsurSubjectCode: number;
    public SchoolIdWithName: string;
    public CategoryId: number;
    public AreaCodeWithName: string;
    public Birthday: Date;
    public Experience: number;
    public Phone: string;
    public ClassNumbers: string;
    public ActualCode: number;
    public Email: string;
    public SecondName?: string;
    public SchoolIdFrom?: string;
}

export class Category {
    Id: number;
    Name: string;
}

export class RsurSubject {
    Code: number;
    Name: string;
}

const CATEGORIES: Category[] = [
    { Id: 0, Name: 'Без категории' },
    { Id: 1, Name: 'Первая категория' },
    { Id: 2, Name: 'Высшая категория' }
]

const RSURSUBJECTS: RsurSubject[] = [
    { Code: 1, Name: 'Русский язык' },
    { Code: 2, Name: 'Математика' },
    { Code: 7, Name: 'История' }
]

@Component({
    selector: 'rsurparticip-add-form',
    templateUrl: './app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.html?v=${new Date().getTime()}',      
    styleUrls: ['./app/rsur/rsurparticip-add-form/rsurparticip-add-form.component.css']
})
export class RsurParticipAddFormComponent implements OnInit {      
    public particip: AddRsurParticip = new AddRsurParticip();    
    formGroup: FormGroup;
    categories: Category[] = CATEGORIES;
    rsurSubjects: RsurSubject[] = RSURSUBJECTS;

    constructor(        
        private router: Router,
        private route: ActivatedRoute,
        private rsurParticipService: RsurParticipService
    ) {
        this.formGroup = new FormGroup({
            "surname": new FormControl("", Validators.required),
            "name": new FormControl("", Validators.required),
            "secondName": new FormControl("", Validators.minLength(3)),
            "experience": new FormControl("", [Validators.required, Validators.min(0), Validators.max(60)]),
            "email": new FormControl("", [
                Validators.required,
                BasicValidators.email
            ]),  
            "phone": new FormControl("", Validators.pattern("[0-9]{11}")),
            "categoryId": new FormControl(),
            "rsurSubjectCode": new FormControl(),
            "birthday": new FormControl("", Validators.)
        });       
    }

    ngOnInit() {
        //var id = this.route.params.subscribe(params => {
        //    var id = params['id'];

        //    this.title = id ? 'Edit User' : 'New User';

        //    if (!id)
        //        return;

        //    this.usersService.getUser(id)
        //        .subscribe(
        //        user => this.user = user,
        //        response => {
        //            if (response.status == 404) {
        //                this.router.navigate(['NotFound']);
        //            }
        //        });
        //});
    }

    save() {
        this.rsurParticipService.createParticip(this.formGroup.value).
            subscribe(data => this.router.navigate(['rsurparticips']));        

        //var result,
        //    userValue = this.form.value;

        //if (userValue.id) {
        //    result = this.usersService.updateUser(userValue);
        //} else {
        //    result = this.usersService.addUser(userValue);
        //}

        //result.subscribe(data => this.router.navigate(['users']));
    }
}
