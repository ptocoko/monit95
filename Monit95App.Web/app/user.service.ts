import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getName() {
        return this.http.get('/api/User/GetName');
    }

}