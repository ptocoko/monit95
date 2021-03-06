import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../models/account.model';
import { SchoolService } from '../school.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';

@Injectable()
export class AccountService {    
	account: AccountModel = new AccountModel();
	private readonly auth$ = new BehaviorSubject<AccountModel>(null);
	get auth() {
		return this.auth$.pipe(filter(auth => auth !== null))
	}

	constructor(private readonly http: HttpClient, private readonly schoolService: SchoolService) {
		this.loadAccount();
	}

    private loadAccount() {
		this.http.get<AccountModel>('api/account').subscribe(res => {
			this.account = res;
			this.auth$.next(res);
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

	isITakeEGE() {
		if (this.account.RoleNames) {
			return this.account.RoleNames.indexOf('i-take-ege') > -1;
		}
		return null;
	}

	isITakeOGE() {
		if (this.account.RoleNames) {
			return this.account.RoleNames.indexOf('i-take-oge') > -1;
		}
		return null;
	}

	isGroznySchool() {
		if (this.account.RoleNames) {
			return this.account.RoleNames.indexOf('grozny-school') > -1;
		}
		return null;
	}
}