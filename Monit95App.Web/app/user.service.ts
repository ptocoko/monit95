import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from './user.model';

@Injectable()
export class UserService {
    private userNameAndRole: Observable<UserModel>;

    constructor(private http: Http) {

    }

    getName(): Promise<any> {
        return this.http.get("account/getName").toPromise().then(response => {
            return response.text();
        });
    }
}