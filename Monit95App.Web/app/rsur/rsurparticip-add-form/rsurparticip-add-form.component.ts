import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RsurParticip } from '../rsurparticip';

import { RsurParticipService } from '../rsurparticip.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
    selector: 'rsur-add-form',
    templateUrl: './rsurparticip-add-form.component.html',
    styleUrls: ['./rsurparticip-add-form.component.css']
})
export class RsurParticipAddFormComponent implements OnInit {

    form: FormGroup;
    title: string;
    particip: RsurParticip;

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private rsurParticipService: RsurParticipService
    ) {
        this.form = formBuilder.group({
            surname: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            name: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            secondName: ['', [                
                Validators.minLength(3)
            ]],
            categoryId: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            experience: ['', [
                Validators.required                
            ]],
            email: ['', [
                Validators.required,
                BasicValidators.email
                //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]],
            phone: ['', [
                Validators.required,
                Validators.pattern('[0-9]')
            ]],
            rsurSubjectCode: ['', [
                Validators.required                
            ]],
            birthday: ['', [
                Validators.required
            ]],
            classNumbers: ['', [
                Validators.required
            ]],
            schoolIdFrom: ['', [                
            ]],
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
        this.rsurParticipService.createParticip(this.form.value).
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
