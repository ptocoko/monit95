import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Account } from './account';

@Injectable()
export class AccountService {    

    constructor(private readonly http: Http) { }

    getAccount() {
		return this.http.get('/api/accounts');
    }
}