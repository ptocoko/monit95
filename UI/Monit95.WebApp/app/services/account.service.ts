import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../models/account.model';

@Injectable()
export class AccountService {    
    account: AccountModel = new AccountModel();

	constructor(private readonly http: HttpClient) {
		this.loadAccount();
	}

    private loadAccount() {
		this.http.get<AccountModel>('api/account').subscribe(res => {
            this.account = res;
		})
	}

	getAccount() {
		return this.http.get<AccountModel>('api/account');
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

	isCoko() {
		if (this.account.RoleNames) {
			return this.account.RoleNames.indexOf('coko') > -1;
		}
		return null;
	}
}