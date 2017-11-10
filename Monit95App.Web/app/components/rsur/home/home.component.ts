﻿import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountModel } from '../../../models/account.model';

@Component({
    templateUrl: `./app/components/rsur/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent implements  OnInit {
    account = new AccountModel();        

    constructor(
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as AccountModel;            
        });
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