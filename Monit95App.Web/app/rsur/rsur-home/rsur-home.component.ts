import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Account } from '../../account/account';

@Component({
    templateUrl: `./app/rsur/rsur-home/rsur-home.component.html?v=${new Date().getTime()}`
})
export class RsurHomeComponent implements  OnInit {
    account = new Account();    
    test = 'test 2';

    constructor(
        private readonly accountService: AccountService) {
    }

    ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as Account;            
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