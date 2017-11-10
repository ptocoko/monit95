import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AccountModel } from '../models/account.model';

@Injectable()
export class AccountService {    
    account: Account = new AccountModel();

	constructor(private readonly http: Http) {
		this.loadAccount();
	}

    private loadAccount() {
		this.http.get('api/account').subscribe(res => {
			this.account = res.json() as Account;
		})
	}

	getAccount() {
		return this.http.get('api/account');
	}

	isArea() {
		if (this.account.RoleNames != null)
			return this.account.RoleNames.indexOf('area') > -1;
		return null;
	}

	isSchool() {
		if (this.account.RoleNames != null)
			return this.account.RoleNames.indexOf('school') > -1;
		return null;
	}

	isRsurParticip() {
		if (this.account.RoleNames != null)
			return this.account.RoleNames.indexOf('rsur-particip') > -1;
		return null;
	}
}